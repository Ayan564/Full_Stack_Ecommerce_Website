// Importing JSON Web Token library
import jwt from "jsonwebtoken";

// Function to generate JWT token and set it as an Http-only cookie
const generateToken = (res, userId) => {
  // Generate JWT token with userId payload, using JWT_SECRET from environment variables, and setting expiration to 30 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT token as an Http-only cookie with secure flag based on environment (secure in development mode if NODE_ENV is not development)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "strict", // Set sameSite attribute to strict
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set maxAge to 30 days in milliseconds
  });

  return token; // Return the generated JWT token
};

// Export the generateToken function for use in other modules
export default generateToken;
