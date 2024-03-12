// Importing User model
import User from "../models/userModel.js";
// Importing asyncHandler middleware
import asyncHandler from "../middlewares/asyncHandler.js";
// Importing bcrypt for password hashing
import bcrypt from "bcryptjs";
// Importing function to create JWT tokens
import createToken from "../utils/createToken.js";

// Controller function to create a new user
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

// Controller function for user login
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

// Controller function for user logout
const logoutUser = asyncHandler(async (req, res) => {
  // Clear JWT cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // Send success message
  res.status(200).json({ message: "Logged out successfully" });
});

// Controller function to fetch all users (accessible only to admin users)
const getAllUsers = asyncHandler(async (req, res) => {
  // Find all users in the database
  const users = await User.find({});
  // Send response with user data
  res.json(users);
});

// Exporting controller functions
export { createUser, loginUser, logoutUser, getAllUsers };
