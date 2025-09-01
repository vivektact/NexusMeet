import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import FriendsList from "../components/FriendsList";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [learners, setLearners] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // 1) current user
      const { data: me } = await axiosInstance.get("/user/landing", { withCredentials: true });
      const currentUser = me.user;
      setUser(currentUser);

      // 2) friends (accepted)
      let friendsArr = [];
      try {
        const { data } = await axiosInstance.get("/user/friends", { withCredentials: true });
        friendsArr = Array.isArray(data) ? data : [];
        setFriends(friendsArr);
      } catch (friendError) {
        console.warn("Friends fetch failed:", friendError?.message || friendError);
      }

      // 3) all users
      const { data: allUsersRes } = await axiosInstance.get("/user/all", { withCredentials: true });

      // 4) exclude self + exclude friends + language match
      const friendIdSet = new Set(friendsArr.map(f => f._id));
      const filtered = (allUsersRes.users || []).filter((u) =>
        u._id !== currentUser._id &&
        !friendIdSet.has(u._id) &&
        (u.nativeLanguage || "").toLowerCase() === (currentUser.desiredLanguage || "").toLowerCase()
        // If you want mutual exchange, also add:
        // && (u.desiredLanguage || "").toLowerCase() === (currentUser.nativeLanguage || "").toLowerCase()
      );

      setLearners(filtered);
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data?.message || err.message);
      if (err.response?.status === 401) window.location.href = "/login";
    }
  };

  fetchData();
}, []);



  if (!user) return <div className="text-white p-6">Loading...</div>;
  // ✅ Send Friend Request
  const sendRequest = async (receiverId) => {
  try {
    await axiosInstance.post(
      "/user/friend-request",
      { receiverId }, // ✅ Send in body instead of URL
      { withCredentials: true }
    );
    alert("Friend request sent!");
  } catch (err) {
    console.error("Error sending friend request:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error sending friend request");
  }
};

 // ✅ Placeholder for starting chat
  const startChat = (friendId) => {
    console.log("Start chat with:", friendId);
    // Later: redirect to /chat/:friendId
  };
  






  return (
    <div className="min-h-screen w-full bg-[#0a0518] text-white px-4 py-8 space-y-10">
      <h1 className="text-3xl font-bold text-cyan-400">
        Welcome, {user.fullName}
      </h1>
      <div className="space-y-1 text-gray-300">
        <p>Email: {user.email}</p>
        <p>Native Language: {user.nativeLanguage}</p>
        <p>Learning: {user.desiredLanguage}</p>
      </div>
      

       {/* ✅ Friends Section
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
          Your Friends
        </h2>
        {friends.length === 0 ? (
          <p className="text-gray-400">No friends yet. Accept requests to start chatting!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md space-y-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={friend.avatar?.url || "/default-avatar.png"}
                    alt={friend.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{friend.fullName}</h3>
                    <p className="text-sm text-gray-400">@{friend.username || "user"}</p>
                  </div>
                </div>
                {friend.bio && <p className="text-sm text-gray-400">{friend.bio}</p>}
                <button
                  onClick={() => startChat(friend._id)}
                  className="w-full py-2 mt-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 rounded-full text-sm font-semibold text-black transition-all"
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
}*/}
{/* ✅ Friends Section via FriendsList Component
      <FriendsList friends={friends} onStartChat={startChat} /> */}
      <FriendsList />

      {/* Meet New Learners Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-fuchsia-400 mb-6">
          Meet New Learners
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {learners.length === 0 && (
            <p className="text-gray-400">No suitable learners found right now.</p>
          )}
          {learners.map((learner) => (
            <div
              key={learner._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-md space-y-3"
            >
              <div className="flex items-center gap-4">
                <img
                 src={learner.avatar?.url || "/default-avatar.png"}

                  alt={learner.fullName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{learner.fullName}</h3>
                  <p className="text-sm text-gray-400">@{learner.username || "user"}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-cyan-600/30 text-cyan-300 px-2 py-1 text-xs rounded-full">
                  🗣 Native: {learner.nativeLanguage}
                </span>
                <span className="bg-fuchsia-600/30 text-fuchsia-300 px-2 py-1 text-xs rounded-full">
                  📘 Learning: {learner.desiredLanguage}
                </span>
              </div>
              {learner.bio && (
                <p className="text-sm text-gray-400">{learner.bio}</p>
              )}
              <button 
              onClick={() => sendRequest(learner._id)}
              className="w-full py-2 mt-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 rounded-full text-sm font-semibold text-black transition-all">
                Send Friend Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
