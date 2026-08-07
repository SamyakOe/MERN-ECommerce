import express from "express";
import {
  addToCart,
  removeItem,
  updateItemQuantity,
  getCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//   all cart routes
router.use(authMiddleware);

// Add to cart
router.post("/add", addToCart);

// Remove item from cart
router.post("/remove", removeItem);

// Update item quantity in cart
router.post("/update", updateItemQuantity);

// Get user's cart (authenticated via JWT)
router.get("/", getCart);

export default router;
