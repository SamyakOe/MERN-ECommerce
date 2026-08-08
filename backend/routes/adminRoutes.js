import express from "express";
import { getDashboardStats, getRecentOrders, getLowStocks} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware, admin);

//Get Stats for Dashboard
router.get("/dashboard-stats", getDashboardStats);

//Get 5 Recent Orders for Dashboard
router.get("/recent-orders", getRecentOrders);

//Get Low Stocks
router.get("/low-stocks", getLowStocks)

export default router;