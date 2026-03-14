import express from "express";
import userController = require("../controllers/user.controller");
import { authMiddleware, authorizeRole } from "redis-jwt-auth";

const router = express.Router();

router.get("/", authMiddleware({required: true}), authorizeRole("admin") ,userController.getAllUsers);
router.post("/findByEmail", authMiddleware({required: true}), authorizeRole("admin"), userController.getUserByEmail);
router.get("/myProfile", authMiddleware({ required: true }), userController.getUserProfile);

export default router;