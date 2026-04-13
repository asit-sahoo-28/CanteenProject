
import express from "express";
import {
  forgetPasswordOTP,
  resetPasswordWithOTP,
  getUser,
  login,
  logout,
  registerUser,
} from "../controllers/userController.js";
import  isAuthenticated  from "../middlewares/authMiddleware.js";

const userRoute = express.Router();

// ---------------- AUTH ROUTES ----------------
userRoute.post("/register", registerUser);           // Register
userRoute.post("/login", login);                     // Login
userRoute.post("/logout", isAuthenticated, logout);  // Logout
userRoute.get("/me", isAuthenticated, getUser);     // Get current user

// ---------------- PASSWORD RESET (OTP) ----------------
userRoute.post("/password/forget", forgetPasswordOTP);      // Send OTP to email
userRoute.post("/password/reset", resetPasswordWithOTP);    // Reset password using OTP

export default userRoute;