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

router.route("/").post(authentication, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authentication, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authentication, authorizeAdmin, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
export default router;
