import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../context/AuthContext";

dayjs.extend(relativeTime);

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  
      useEffect(() => {
  const fetchNotifications = async () => {
    if (!user) return; // DO NOT return null or JSX in a useEffect

    try {
      const res = await axiosInstance.get("/user/notifications", {
        withCredentials: true,
      });

      const incoming = Array.isArray(res.data.incoming) ? res.data.incoming : [];
      const responseUpdates = Array.isArray(res.data.responseUpdates) ? res.data.responseUpdates : [];

      const incomingTagged = incoming.map((n) => ({
        ...n,
        type: "friend-request",
      }));

      const responseTagged = responseUpdates.map((n) => ({
        ...n,
        type: n.status,
      }));

      setNotifications([...incomingTagged, ...responseTagged]);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      alert("Failed to fetch notifications. Check console.");
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, [user]); // <== ADD user AS A DEPENDENCY




  const handleAccept = async (id) => {
  try {
    await axiosInstance.post("/user/accept", { requestId: id }, { withCredentials: true });
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  } catch (err) {
    console.error("Error accepting request:", err);
  }
};

const handleDecline = async (id) => {
  try {
    await axiosInstance.post("/user/decline", { requestId: id }, { withCredentials: true });
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  } catch (err) {
    console.error("Error declining request:", err);
  }
};

const markAsNotified = async (id) => {
  try {
    await axiosInstance.post("/user/mark-notified", { requestId: id }, { withCredentials: true });
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  } catch (err) {
    console.error("Error marking as notified:", err);
  }
};


  return (
    <div className="min-h-screen bg-[#0a0518] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-fuchsia-400 mb-6">Notifications</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-6">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md"
            >
              {(() => {
  const isCurrentUserSender = note.sender?._id === user._id;
  const otherUser = isCurrentUserSender ? note.receiver : note.sender;

  return (
    <div className="flex items-center gap-4">
      <img
        src={otherUser?.avatar?.url || "/default-avatar.png"}
        alt={otherUser?.fullName || "User"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="text-white font-semibold">
          {note.type === "friend-request" &&
            `${otherUser?.fullName || "Someone"} sent you a friend request`}
          {note.type === "accepted" &&
            `${otherUser?.fullName || "Someone"} accepted your friend request`}
          {note.type === "declined" &&
            `${otherUser?.fullName || "Someone"} declined your friend request`}
        </p>
        <p className="text-gray-400 text-sm">@{otherUser?.username || "user"}</p>
        <p className="text-xs text-gray-500">{dayjs(note.createdAt).fromNow()}</p>
      </div>
    </div>
  );
})()}


              {/* Show Accept/Decline for pending requests where current user is receiver */}
              {note.type === "friend-request" &&
                note.status === "pending" &&
                note.receiver?._id === user._id && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleAccept(note._id)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(note._id)}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                      Decline
                    </button>
                  </div>
                )}

              {/* Dismiss button for accepted/declined notifications if current user was the sender */}
              {(note.type === "accepted" || note.type === "declined") &&
                note.sender?._id === user._id && (
                  <div className="mt-4">
                    <button
                      onClick={() => markAsNotified(note._id)}
                      className="text-xs text-fuchsia-400 underline hover:text-fuchsia-300"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
