import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
//import useAuth from "../hooks/useAuth"; // your auth hook
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { Video ,Phone, ImagePlus, Send, Image, Smile } from "lucide-react";
import Picker from "@emoji-mart/react"; 
import data from "@emoji-mart/data";


function ChatPage() {
  const { friendId } = useParams();
  const { user } = useAuth(); // current logged-in user
  const [friend, setFriend] = useState(null);


  // Chatting box ---
  const [messages, setMessages] = useState([
    { text: "Hi there!", sender: "partner" },
    { text: "Hey! How are you?", sender: "you" },
  ]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();


  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await axiosInstance.get(`/user/friend/${friendId}`);
       // console.log("Fetched friend:", res.data); 
        setFriend(res.data);
      } catch (err) {
        console.error("Error fetching friend:", err);
      }
    };
    if (friendId) fetchFriend();
  }, [friendId]);


// Chatt area --
 const handleEmojiSelect = (emoji) => {
    setInput((prev) => prev + emoji.native);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const hideEmojiPicker = () => {
if(showEmojiPicker){
    setShowEmojiPicker(!showEmojiPicker);
    }
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "you" }]);
      setInput("");
    }
    hideEmojiPicker();
  };


  if (!friend) return <p>Loading chat...</p>;

//  console.log(`Chat between ${user?.fullName} and ${friend.fullName}`)


    return (

    <div className="relative flex items-center justify-center min-h-screen bg-[#0a0518] text-white overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-cyan-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-fuchsia-500/20 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

      {/* Chat Window */}
      <div className="relative z-10 w-full max-w-3xl h-[70vh] bg-black/30 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col p-4">
    


     <div className="flex items-center justify-between p-3 border-b border-white/10">
    {/* Partner Info */}
    <div className="flex items-center space-x-3">
      <img
        src={friend.avatar?.url || "https://placehold.co/40x40"}
        alt="friend"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span className="text-white font-medium" placeholder = "Alex Johnson">{friend.fullName} </span>
        <span className="text-sm text-gray-400">Online</span>
      </div>
    </div>

    {/* Call Buttons */}
    <div className="flex items-center space-x-4 text-gray-300">
      <button className="hover:text-cyan-400 transition">
        <Phone size={20} />
      </button>
      <button className="hover:text-fuchsia-400 transition">
        <Video size={20} />
      </button>
    </div>
  </div>



      {/* Chat Messages */}
<div className="flex-1 overflow-y-auto px-2 py-1 flex flex-col space-y-2">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`px-4 py-2 rounded-lg text-sm break-words max-w-[60%] ${
        msg.sender === "you"
          ? "self-end bg-cyan-400 text-black"   // Outgoing on right
          : "self-start bg-fuchsia-600 text-white" // Incoming on left
      }`}
    >
      {msg.text}
    </div>
  ))}
</div>


        {/* Input Area */}
        <div className="flex items-center gap-2 mt-4">

          {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Emoji Icon */}
        <button
          onClick={toggleEmojiPicker}
          className="text-gray-400 hover:text-cyan-400 transition"
        >
          <Smile size={22} />
        </button>

        {/* File Upload */}
        <label className="text-gray-400 hover:text-fuchsia-400 transition cursor-pointer">
          <ImagePlus size={22} />
          <input type="file" className="hidden" />
        </label>
        </div>

          
          <input
            type="text"
            value={input}
            onClick={hideEmojiPicker}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-600 hover:to-fuchsia-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;