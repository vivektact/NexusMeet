import express from "express";
import FriendRequest from "../models/FriendRequest.js";

const router = express.Router();

router.get("/fix-notified", async (req, res) => {
  try {
    const result = await FriendRequest.updateMany(
      { notified: { $exists: false } },
      { $set: { notified: false } }
    );
    res.json({ message: "Updated successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

export default router;
