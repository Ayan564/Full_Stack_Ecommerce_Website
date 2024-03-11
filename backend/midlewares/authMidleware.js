import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Authentication of the normal user

const authentication = asyncHandler(async (req, res, next) => {
  let token;
  // Read jwt from the jwt cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(-password);
      next();
    } catch (error) {
      res.status(401).send("Not authorized, token failed");
    }
  } else {
    res.status(401).send("Not authorized, no token");
  }
});

// Authentication of a Admin User

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

export { authentication, authorizeAdmin, getAllUsers };
