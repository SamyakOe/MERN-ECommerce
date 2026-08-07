import express from "express";
import { saveAddress, getAddress } from "../controllers/addressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);

//To add Address
router.post("/add", saveAddress);

//To get Address
router.get("/get", getAddress);

export default router;