import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for LandingPage
router.get("/landing", protect, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.fullName}, this is your LandingPage.`,
    user: req.user,
  });
});

export default router;
