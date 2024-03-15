// Importing Express framework
import express from "express";
// Importing controller functions
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById, // Controller function to delete a user by ID
  getUserById, // Controller function to fetch a user by ID
  updateUserById, // Controller function to update a user by ID
} from "../controllers/userController.js";
// Importing authentication and authorization middleware
import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

// Creating an instance of Express Router
const router = express.Router();

// Define routes and their corresponding HTTP methods
router
  .route("/")
  .post(createUser) // Route for creating a new user, accessible to all
  .get(authentication, authorizeAdmin, getAllUsers); // Route for fetching all users, accessible only to admin users
router.post("/login", loginUser); // Route for user login
router.post("/logout", logoutUser); // Route for user logout

router
  .route("/profile")
  .get(authentication, getCurrentUserProfile)
  .put(authentication, updateCurrentUserProfile); // Route for fetching and updating user profile, accessible only to authenticated users

router
  .route("/:id")
  .delete(authentication, authorizeAdmin, deleteUserById)
  .get(authentication, authorizeAdmin, getUserById)
  .put(authentication, authorizeAdmin, updateUserById); // Route for fetching and updating user by ID, accessible only to admin users

export default router; // Exporting the router for use in other modules
