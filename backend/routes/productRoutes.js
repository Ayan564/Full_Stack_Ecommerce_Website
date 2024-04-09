/*
  productRoutes.js
  Description: Defines routes for managing products, including CRUD operations and product filtering.
*/

import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Import controllers and middleware
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";
import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Define routes
router
  .route("/")
  .get(fetchProducts) // Fetch all products
  .post(authentication, authorizeAdmin, formidable(), addProduct); // Add a new product

router.route("/allproducts").get(fetchAllProducts); // Fetch all products (admin)

router.route("/:id/reviews").post(authentication, checkId, addProductReview); // Add a review to a product

router.get("/top", fetchTopProducts); // Fetch top-rated products
router.get("/new", fetchNewProducts); // Fetch newly added products

router
  .route("/:id")
  .get(fetchProductById) // Fetch a product by ID
  .put(authentication, authorizeAdmin, formidable(), updateProductDetails) // Update product details
  .delete(authentication, authorizeAdmin, removeProduct); // Delete a product

router.route("/filtered-products").post(filterProducts); // Filter products based on criteria

export default router;
