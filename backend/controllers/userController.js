import User from "../models/userModel.js";
import asyncHandler from "../midlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .send("Invalid user data: Please fill all the inputs"); // Send "Invalid user data" message when inputs are missing
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    createToken(res, newUser._id);
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send("Invalid user data: Please fill all the inputs"); // Send "Invalid user data" message when inputs are missing
  }
  const ExistUser = await User.findOne({ email });
  if (ExistUser) {
    const isPasswordMatch = await bcrypt.compare(password, ExistUser.password);
    if (isPasswordMatch) {
      createToken(res, ExistUser._id);
      res.status(201).json({
        _id: ExistUser._id,
        username: ExistUser.username,
        email: ExistUser.email,
        isAdmin: ExistUser.isAdmin,
      });
    }
    return;
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export { createUser, loginUser, logoutUser };
