// Importing JSON Web Token library
import jwt from "jsonwebtoken";
// Importing asyncHandler for handling asynchronous functions
import asyncHandler from "express-async-handler";
// Importing User model
import User from "../models/userModel.js";

// Middleware for authenticating Normal users
const authentication = asyncHandler(async (req, res, next) => {
  let token;
  // Extract JWT token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch user details from database excluding password
      req.user = await User.findById(decoded.userId).select("-password");
      // Move to the next middleware
      next();
    } catch (error) {
      // Token verification failed
      res.status(401).send("Not authorized, token failed");
    }
  } else {
    // No token found in the request
    res.status(401).send("Not authorized, no token found");
  }
});

// Middleware for authorizing admin users
const authorizeAdmin = asyncHandler(async (req, res, next) => {
  // Check if user exists in request and is an admin
  if (req.user && req.user.isAdmin) {
    // Move to the next middleware
    next();
  } else {
    // User is not an admin
    res.status(401).send("Not authorized as an admin");
  }
});

// Exporting the middleware functions
export { authentication, authorizeAdmin };
