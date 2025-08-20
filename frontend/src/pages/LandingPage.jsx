import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [learners, setLearners] = useState([]);
  //const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/user/landing", { withCredentials: true });
        setUser(res.data.user);

        const allUsers = await axiosInstance.get("/user/all", { withCredentials: true });
        const filtered = allUsers.data.users.filter(
          (u) =>
            u._id !== res.data.user._id && // exclude self
            u.nativeLanguage.toLowerCase() === res.data.user.desiredLanguage.toLowerCase()
        );
        setLearners(filtered);
        /*
        // ✅ Fetch friends
        const friendsRes = await axiosInstance.get("/friends/friends", { withCredentials: true });
        setFriends(friendsRes.data);
        */
      } 
        catch (err) {
        console.error("Error fetching users:", err.response?.data?.message || err.message);
        window.location.href = "/login";
      }
    };

    fetchData();
  }, []);

  if (!user) return <div className="text-white p-6">Loading...</div>;
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
/*
 // ✅ Placeholder for starting chat
  const startChat = (friendId) => {
    console.log("Start chat with:", friendId);
    // Later: redirect to /chat/:friendId
  };
  */






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
        <h2 className="text-2xl font-semibold text-green-400 mb-6">
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
                  className="w-full py-2 mt-2 bg-gradient-to-r from-green-400 to-cyan-500 hover:opacity-90 rounded-full text-sm font-semibold text-black transition-all"
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
       */}

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
