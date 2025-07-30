import React from 'react';
import { useAuth } from "../../context/AuthContext";


export const Header = () => {
  const { user, logout } = useAuth();
  return (
    // UPDATED: Changed background to match the HomePage for a consistent look
    <header className="sticky top-0 z-50 bg-[#0a0518] border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
            NexusMeet
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
    <>
      {/* Avatar */}
      <img
        src={user.avatar?.url || "https://placehold.co/40x40"}
        alt="Avatar"
        className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
      />

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
          <a href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
            Login
          </a>
          <a
            href="/register"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            Register
          </a>
        </>
  )}
      </div>
      </div>
    </header>
  );
};

export default Header;
