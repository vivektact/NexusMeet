import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


const LoginPage = () => {
  const { login } = useAuth(); 

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post("/auth/login", formState, { withCredentials: true });
    login(res.data.user);
    toast.success("Login successful 🎉");
    // Redirect to LandingPage
    window.location.href = "/landing";
  } catch (error) {
    const message = error.response?.data?.message || "Login failed. Try again.";
    toast.error(message);
    console.error("Login error:", message);
  }
};


  const inputClass =
    "glass-input w-full px-4 py-2 bg-gray-900/60 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition";

  return (
    <div className="min-h-screen w-full bg-[#0a0518] text-white relative overflow-x-hidden">
      {/* Neon Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 flex items-center justify-center px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.1)] rounded-3xl p-6 sm:p-10 space-y-10 lg:space-y-0 lg:space-x-10">

          {/* Left Section */}
          <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-300 max-w-sm">
              Log in to reconnect with global friends and continue your language journey.
            </p>
            <img
              src="./Learning languages-bro (2).png"
              alt="Login Illustration"
              className="w-64 sm:w-72 md:w-80 lg:w-96"
            />
          </div>

          {/* Right Section: Form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
                className={inputClass}
              />

              {/* Gradient Button */}
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center w-full py-3 px-6 text-lg font-bold text-black bg-cyan-400 rounded-full transition-all duration-300 overflow-hidden hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
              >
                <span className="absolute w-full h-full transition-all duration-500 ease-out bg-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0"></span>
                <span className="relative">Log In</span>
              </button>

              <p className="text-sm text-gray-400 text-center mt-2">
                Don’t have an account?{" "}
                <a href="/register" className="text-cyan-400 hover:underline">Sign Up</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
