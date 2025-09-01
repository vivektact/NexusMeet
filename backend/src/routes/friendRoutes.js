import express from "express";
import {
  sendFriendRequest,
  getNotifications,
  acceptFriendRequest,
  declineFriendRequest,
  markAsNotified, // NEW
  getFriends,
} from "../controllers/friendController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/request", protect, sendFriendRequest);
router.get("/notifications", protect, getNotifications);
router.post("/accept", protect, acceptFriendRequest);
router.post("/decline", protect, declineFriendRequest);
router.post("/mark-notified", protect, markAsNotified);
router.get("/friends", protect,getFriends);



export default router;