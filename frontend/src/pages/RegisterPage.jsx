import React from 'react';
// Make sure you have lucide-react installed: npm install lucide-react
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a0518] text-white overflow-hidden py-12">
      {/* Background Glows for ambiance */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-cyan-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-fuchsia-500/20 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-400">Join Nexus Meet and start connecting</p>
        </div>

        <form className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
            />
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-lg transition-all duration-300 hover:from-cyan-600 hover:to-fuchsia-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/50"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
