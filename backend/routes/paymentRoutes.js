import express from "express";
import {
  initiateEsewaPayment,
  verifyEsewaPayment,
  initiateKhaltiPayment,
  verifyKhaltiPayment,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// eSewa Routes
router.post("/esewa/initiate", authMiddleware, initiateEsewaPayment);
router.post("/esewa/verify", authMiddleware, verifyEsewaPayment);

// Khalti Routes
router.post("/khalti/initiate", authMiddleware, initiateKhaltiPayment);
router.post("/khalti/verify", authMiddleware, verifyKhaltiPayment);

export default router;
