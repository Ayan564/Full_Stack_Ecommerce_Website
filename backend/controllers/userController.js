/*
  UserController.js
  Description: This module contains controller functions for user authentication and management.
*/

// Importing User model
import User from "../models/userModel.js";

// Importing asyncHandler middleware
import asyncHandler from "../middlewares/asyncHandler.js";

// Importing bcrypt for password hashing
import bcrypt from "bcryptjs";

// Importing function to create JWT tokens
import createToken from "../utils/createToken.js";

/**
 * createUser:
 * Description: Handles the creation of a new user.
 * It extracts username, email, and password from the request body,
 * checks if all required fields are provided, and validates whether
 * a user with the same email already exists in the database.
 * It then hashes the password using bcrypt, creates a new user instance,
 * saves it to the database, creates a JWT token, and sends it as a cookie.
 * Finally, it responds with the newly created user's information.
 *
 * @param {Object} req - The request object containing username, email, and password in the req.body.
 * @param {Object} res - The response object to send back the newly created user's information or error.
 * @returns {JSON} - JSON response with the newly created user's information or error message.
 */
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .send("Invalid user data: Please fill all the inputs");
  }

  // Check if user already exists with the given email
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send("User already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save the new user to the database
    await newUser.save();
    // Create and send JWT token as a cookie
    createToken(res, newUser._id);
    // Send response with user data
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400).send("Invalid user data");
  }
});

/**
 * loginUser:
 * Description: Handles the login process for a user.
 * It extracts email and password from the request body,
 * checks if both are provided, and searches for a user with the provided email.
 * If the user exists, it compares the provided password with the hashed password
 * stored in the database using bcrypt.
 * If the passwords match, it creates a JWT token and sends it as a cookie,
 * then responds with the user's information.
 *
 * @param {Object} req - The request object containing email and password in the req.body.
 * @param {Object} res - The response object to send back the logged-in user's information or error.
 * @returns {JSON} - JSON response with the logged-in user's information or error message.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .send("Invalid user data: Please fill all the inputs");
  }

  // Find user with the provided email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Check if the provided password matches the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordMatch) {
      // Create and send JWT token as a cookie
      createToken(res, existingUser._id);
      // Send response with user data
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    }
    return;
  }
});

/**
 * logoutUser:
 * Description: Handles the logout process for a user.
 * It clears the JWT cookie by setting it to an empty string
 * and expires it immediately by setting the expiry date to the past.
 * Finally, it responds with a success message.
 *
 * @param {Object} req - The request object containing the JWT cookie to clear.
 * @param {Object} res - The response object to send back the success message.
 * @returns {JSON} - JSON response with a success message.
 */
const logoutUser = asyncHandler(async (req, res) => {
  // Clear JWT cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // Send success message
  res.status(200).json({ message: "Logged out successfully" });
});

/**
 * getAllUsers:
 * Description: Retrieves all users from the database.
 * It finds all user documents in the User collection and sends them back as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of users.
 * @returns {JSON} - JSON response with the list of users.
 */
const getAllUsers = asyncHandler(async (req, res) => {
  // Find all users in the database
  const users = await User.find({});
  // Send response with user data
  res.json(users);
});

/**
 * getCurrentUserProfile:
 * Description: Retrieves the profile information of the currently authenticated user.
 * It finds the user document in the User collection using the user ID from the request object.
 * If the user is found, it responds with the user's profile information.
 * If the user is not found, it responds with a 404 status and throws an error.
 *
 * @param {Object} req - The request object containing user ID in the req.user._id field.
 * @param {Object} res - The response object to send back the user's profile information or error.
 * @returns {JSON} - JSON response with the user's profile information or error message.
 */
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  // Find the user document in the User collection using the user ID from the request object
  const user = await User.findById(req.user._id);
  // If the user is found, respond with the user's profile information
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If the user is not found, respond with a 404 status and throw an error
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * updateCurrentUserProfile:
 * Description: Updates the profile information of the currently authenticated user.
 * It finds the user document in the User collection using the user ID from the request object.
 * If the user is found, it updates the user's username, email, and password (if provided) based on the request body.
 * After updating, it saves the changes to the database and responds with the updated user's information.
 * If the user is not found, it responds with a 404 status and throws an error.
 *
 * @param {Object} req - The request object containing user ID in the req.user._id field and updated profile information in the req.body.
 * @param {Object} res - The response object to send back the updated user's profile information or error.
 * @returns {JSON} - JSON response with the updated user's profile information or error message.
 */
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  // Find the user document in the User collection using the user ID from the request object
  const user = await User.findById(req.user._id);
  // If the user is found, update the user's username, email, and password (if provided) based on the request body
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }
    // Save the changes to the database
    const updatedUser = await user.save();
    // Respond with the updated user's information
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // If the user is not found, respond with a 404 status and throw an error
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * deleteUserById:
 * Description: Deletes a user by their ID.
 * If the user is found, it checks if the user is an admin. If yes, it responds with a 400 Bad Request.
 * If the user is not an admin, it deletes the user from the database and responds with a success message.
 * If the user is not found, it responds with a 404 Not Found error.
 *
 * @param {Object} req - The request object containing user ID in the req.params.id field.
 * @param {Object} res - The response object to send back the success message or error.
 * @returns {JSON} - JSON response indicating success or failure.
 */
const deleteUserById = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // Check if the user exists
  if (user) {
    // Check if the user is an admin
    if (user.isAdmin) {
      res.status(400); // Bad Request
      throw new Error("You cannot delete an admin user");
    }

    // Delete the user from the database
    await User.deleteOne({ _id: user._id });

    // Respond with success message
    res.json({ message: "User removed" });
  } else {
    // If user not found, respond with 404 Not Found error
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * getUserById:
 * Description: Retrieves a user by their ID, excluding their password field.
 * If the user is found, it responds with the user's details.
 * If the user is not found, it responds with a 404 Not Found error.
 *
 * @param {Object} req - The request object containing user ID in the req.params.id field.
 * @param {Object} res - The response object to send back the user's details or error.
 * @returns {JSON} - JSON response containing the user's details or an error message.
 */
const getUserById = asyncHandler(async (req, res) => {
  // Find the user by ID and exclude the password field
  const user = await User.findById(req.params.id).select("-password");

  // Check if the user exists
  if (user) {
    // Respond with the user details
    res.json(user);
  } else {
    // If user not found, respond with 404 Not Found error
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * updateUserById:
 * Description: Updates a user's details by their ID.
 * If the user is found, it updates the user's details based on the request body.
 * If the user is not found, it responds with a 404 Not Found error.
 *
 * @param {Object} req - The request object containing user ID in the req.params.id field and updated user details in the req.body.
 * @param {Object} res - The response object to send back the updated user's details or error.
 * @returns {JSON} - JSON response containing the updated user's details or an error message.
 */
const updateUserById = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // Check if the user exists
  if (user) {
    // Update user details with request body data or keep existing values if not provided
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Respond with the updated user details
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // If user not found, respond with 404 Not Found error
    res.status(404);
    throw new Error("User not found");
  }
});

// Exporting controller functions
export {
  createUser, // Controller function to create a new user
  loginUser, // Controller function for user login
  logoutUser, // Controller function for user logout
  getAllUsers, // Controller function to fetch all users (accessible only to admin users)
  getCurrentUserProfile, // Controller function to get the current user's profile
  updateCurrentUserProfile, // Controller function to update the current user's profile
  deleteUserById, // Controller function to delete a user by ID
  getUserById, // Controller function to fetch a user by ID
  updateUserById, // Controller function to update a user by ID
};
