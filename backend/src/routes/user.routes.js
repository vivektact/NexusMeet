import express from "express"
import {
  register,
  login,
  logout,
  getMe,
  verifyUser,
} from "../controllers/user.controllers.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authMiddleware, getMe)
router.post("/verify/:token", verifyUser)
router.post("", verifyUser)

export default router
