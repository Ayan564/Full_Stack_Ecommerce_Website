/*
  orderRoutes.js
  Description: Defines routes for handling orders, including creation, retrieval, and modification.
*/

import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

// Routes for handling orders
router
  .route("/")
  .post(authentication, createOrder) // Route to create a new order
  .get(authentication, authorizeAdmin, getAllOrders); // Route to fetch all orders (accessible only to admin)

router.route("/mine").get(authentication, getUserOrders); // Route to fetch orders of the current user
router.route("/total-orders").get(countTotalOrders); // Route to count total orders
router.route("/total-sales").get(calculateTotalSales); // Route to calculate total sales
router.route("/total-sales-by-date").get(calculateTotalSalesByDate); // Route to calculate total sales by date
router.route("/:id").get(authentication, findOrderById); // Route to fetch order by ID
router.route("/:id/pay").put(authentication, markOrderAsPaid); // Route to mark order as paid
router
  .route("/:id/deliver")
  .put(authentication, authorizeAdmin, markOrderAsDelivered); // Route to mark order as delivered by admin

export default router;
