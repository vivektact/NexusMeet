import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

// Send friend request
export const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  if (senderId === receiverId) return res.status(400).json({ message: "You cannot send request to yourself" });

  // Check if already sent
  const exists = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
  if (exists) return res.status(400).json({ message: "Friend request already sent" });

  const newRequest = new FriendRequest({
  sender: senderId,
  receiver: receiverId,
  status: "pending",      // if not already default
  notified: false         // ensures backend is consistent
});

  await newRequest.save();

  res.status(201).json({ message: "Friend request sent" });
};

// Get notifications for logged in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await FriendRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "fullName username avatar nativeLanguage desiredLanguage")
      .populate("receiver", "fullName username avatar nativeLanguage desiredLanguage")
      .sort({ createdAt: -1 });

    const incoming = requests.filter(
      (r) =>
        r.receiver &&
        r.receiver._id.toString() === userId &&
        r.status === "pending"
    );

    const responseUpdates = requests.filter(
      (r) =>
        r.sender &&
        r.sender._id.toString() === userId &&
        (r.status === "accepted" || r.status === "declined") &&
        r.notified === false
    );

    res.status(200).json({
      incoming,
      responseUpdates,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;

  const request = await FriendRequest.findById(requestId);
  if (!request || request.receiver.toString() !== userId)
    return res.status(403).json({ message: "Not authorized" });

  // Update the original request to accepted
  request.status = "accepted";
  request.notified = false;
  await request.save();

  

  res.status(200).json({ message: "Friend request accepted" });
};

//Decline Friend Request
export const declineFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;

  const request = await FriendRequest.findById(requestId);
  if (!request || request.receiver.toString() !== userId)
    return res.status(403).json({ message: "Not authorized" });

  // Update the original request to declined
  request.status = "declined";
  request.notified = false;
  await request.save();

  
  res.status(200).json({ message: "Friend request declined" });
};

//Mark Notification as Seen
export const markAsNotified = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;

  const request = await FriendRequest.findById(requestId);
  if (!request || request.sender.toString() !== userId)
    return res.status(403).json({ message: "Not authorized" });

  request.notified = true;
  await request.save();

  res.status(200).json({ message: "Marked as notified" });
};
/*
// Get Friends List
export const getFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all requests where status is accepted and the current user is involved
    const requests = await FriendRequest.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "fullName username avatar bio")
      .populate("receiver", "fullName username avatar bio");

    // Extract friend objects (not myself)
    const friends = requests.map((req) =>
      req.sender._id.toString() === userId ? req.receiver : req.sender
    );

    res.status(200).json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error.message);
    res.status(500).json({ message: "Failed to fetch friends" });
  }
};

*/

