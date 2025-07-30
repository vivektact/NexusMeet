import express from"express";
import {login,logout,register,getCurrentUser} from "../controllers/auth.controller.js"
import {isAuthenticated } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
const router=express.Router();
router.post("/register",upload.single("avatar"),register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/me", isAuthenticated , getCurrentUser); 

export default router;