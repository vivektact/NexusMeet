import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import {
  sendFriendRequest,
  getNotifications,
  acceptFriendRequest,
  declineFriendRequest,
  markAsNotified
} from "../controllers/friendController.js";

const router = express.Router();

// ✅ GET /user/landing
router.get("/landing", protect, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.fullName}, this is your LandingPage.`,
    user: req.user,
  });
});

// ✅ GET /user/all - Matches users by language
router.get("/all", protect, async (req, res) => {
  try {
    const currentUser = req.user;

    const matchedUsers = await User.find({
      _id: { $ne: currentUser._id },
      nativeLanguage: currentUser.desiredLanguage,
    }).select("fullName username avatar nativeLanguage desiredLanguage bio city");

    res.json({ users: matchedUsers });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});


// ✅ GET /user/:id - fetch user by ID
router.get("/friend/:id", protect, async (req, res) => {
  try {
    const friend = await User.findById(req.params.id).select(
      "fullName username avatar nativeLanguage desiredLanguage bio city"
    );
    if (!friend) return res.status(404).json({ message: "User not found" });

    res.json(friend);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
});


// ✅ POST /user/friend-request - send request
router.post("/friend-request", protect, sendFriendRequest);

// ✅ GET /user/notifications - fetch all notifications
router.get("/notifications", protect, getNotifications);

// ✅ POST /user/notifications/:id/accept - accept request
router.post("/notifications/:id/accept", protect, acceptFriendRequest);

// ✅ POST /user/notifications/:id/decline - decline request
router.post("/notifications/:id/decline", protect, declineFriendRequest);

// ✅ POST /user/notifications/:id/mark - mark as notified
router.post("/notifications/:id/mark", protect, markAsNotified);

export default router;
