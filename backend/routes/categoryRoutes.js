/*
  categoryRoutes.js
  Description: Defines routes for category-related CRUD operations,
  including creating, updating, removing, listing, and reading categories.
*/

import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new category (POST /api/categories)
router.route("/").post(authentication, authorizeAdmin, createCategory);

// Route to update an existing category (PUT /api/categories/:categoryId)
router
  .route("/:categoryId")
  .put(authentication, authorizeAdmin, updateCategory);

// Route to remove a category (DELETE /api/categories/:categoryId)
router
  .route("/:categoryId")
  .delete(authentication, authorizeAdmin, removeCategory);

// Route to list all categories (GET /api/categories)
router.route("/categories").get(listCategory);

// Route to read a category by ID (GET /api/categories/:id)
router.route("/:id").get(readCategory);

export default router;
