import userController from "../controllers/user.controller";
import express from "express";
import { authMiddleware, authorizeRole } from "redis-jwt-auth"

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/findByEmail", authMiddleware({required: true}), userController.getUserByEmail);
router.get("/myProfile", authMiddleware({ required: true }), userController.getUserProfile);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", authMiddleware({required: true}), userController.logoutUser);
router.post("/refresh", userController.rotateRefreshToken);
router.post("/send-verify-otp", authMiddleware({required: true}), userController.sendVerifyOTP);
router.post("/verify-email", authMiddleware({required: true}), userController.verifyEmail);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

export default router;