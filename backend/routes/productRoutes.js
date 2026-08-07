import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

//to create a new product (Admin Only)
router.post("/add", authMiddleware, admin, createProduct);

//to get all products (Public)
router.get("/", getAllProducts);

//to update a product (Admin Only)
router.put("/update/:id", authMiddleware, admin, updateProduct);

//to delete a product (Admin Only)
router.delete("/delete/:id", authMiddleware, admin, deleteProduct);

export default router;
