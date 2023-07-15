//import
import express from "express";
import {
  register,
  logout,
  getProfile,
  login,
  allusers,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";

//* Router
const router = express.Router();

//* Register Route
router.post("/register", register);

//* Login User
router.post("/login", login);

//* Logout User
router.get("/logout", isAuthenticated, logout);

//* User Read
router.get("/all", allusers);

//* Get User Profile
router.get("/profile", isAuthenticated, getProfile);

//* Export
export default router;
