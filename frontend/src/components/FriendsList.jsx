import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get("/user/friends", { withCredentials: true });
        setFriends(res.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);
  const startChat = (friendId) => {
    console.log("Start chat with:", friendId);
    // ✅ Later, redirect to /chat/:friendId using React Router
    // Example:
    // navigate(`/chat/${friendId}`);
  };


  return (
    <div className="bg-[#0a0518] text-white px-6 py-8 rounded-xl mt-6">
      <h2 className="text-2xl font-bold text-fuchsia-400 mb-6">Your Friends</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : friends.length === 0 ? (
        <p className="text-gray-500">No friends yet. Start connecting!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div
              key={friend._id}
             className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md space-y-3"
            >
              {/* Avatar & Name */}
      <div className="flex items-center gap-4">
              <img
                src={friend.avatar?.url || "/default-avatar.png"}
                alt={friend.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{friend.fullName}</h3>
                <p className="text-sm text-gray-400">@{friend.username}</p>
                </div>
                </div>
                {/* Language Badges */}
      <div className="flex gap-2 flex-wrap">
        {friend.nativeLanguage && (
          <span className="bg-cyan-600/30 text-cyan-300 px-2 py-1 text-xs rounded-full">
            🗣 Native: {friend.nativeLanguage}
          </span>
        )}
        {friend.desiredLanguage && (
          <span className="bg-fuchsia-600/30 text-fuchsia-300 px-2 py-1 text-xs rounded-full">
            📘 Learning: {friend.desiredLanguage}
          </span>
        )}
      </div>
                {/* Bio */}
      {friend.bio && (
        <p className="text-sm text-gray-400">{friend.bio}</p>
      )}

              
              <button
                onClick={() => startChat(friend._id)}
                className="w-full py-2 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 hover:opacity-90 rounded-full text-sm font-semibold text-black transition-all"
                >
                Start Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
