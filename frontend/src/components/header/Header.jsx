import React from 'react';

export const Header = () => {
  return (
    // UPDATED: Changed background to match the HomePage for a consistent look
    <header className="sticky top-0 z-50 bg-[#0a0518] border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
            Nexus Meet
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
            Login
          </a>
          <a
            href="/register"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
