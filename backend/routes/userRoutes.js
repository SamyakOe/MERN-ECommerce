import express from "express";
import { getUsers,getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

//Get all users
router.get("/", getUsers);

//Get user by Id
router.get("/get", getUser);

export default router;