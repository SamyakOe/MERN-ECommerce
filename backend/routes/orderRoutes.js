import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// Create a new order
router.post("/", createOrder);

//Get all Orders
router.get("/", getAllOrders)

// Get all orders for the logged-in user
router.get("/my", getMyOrders);

// Get a single order by ID
router.get("/:id", getOrderById);

//Update the status of an order by ID
router.patch("/:id/status", updateStatus);
export default router;
