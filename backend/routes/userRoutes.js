import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

import {
  authentication,
  authorizeAdmin,
  getAllUsers,
} from "../midlewares/authMidleware.js";
const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authentication, authorizeAdmin, getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;
