import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {admin} from "../middleware/adminMiddleware.js"
const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// Create a new order
router.post("/", createOrder);

//Get all Orders (Admin Only)
router.get("/", admin, getAllOrders)

// Get all orders for the logged-in user
router.get("/my", getMyOrders);

// Get a single order by ID
router.get("/:id", getOrderById);

//Update the status of an order by ID
router.patch("/:id/status",admin, updateStatus);
export default router;
