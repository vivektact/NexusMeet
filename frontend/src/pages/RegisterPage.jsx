import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";


const languages = [
  "English", "Hindi", "Spanish", "French", "German",
  "Chinese", "Japanese", "Arabic", "Russian", "Portuguese"
];

const RegisterPage = () => {
  const [formState, setFormState] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    bio: "",
    city: "",
    nativeLanguage: "",
    desiredLanguage: ""
  });
  const avatarInputRef = useRef(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      setFormState({ ...formState, avatar: files[0] });
      setPreviewAvatar(URL.createObjectURL(files[0]));
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const payload = {
//     fullName: formState.fullname,
//     username: formState.username,
//     email: formState.email,
//     password: formState.password,
//     bio: formState.bio,
//     city: formState.city,
//     nativeLanguage: formState.nativeLanguage,
//     desiredLanguage: formState.desiredLanguage,
//     avatar: {
//   url: "https://placehold.co/600x400",
//   mimeType: "image/png",       // default or mock type
//   size: 0,                     // placeholder
//   localPath: ""                // empty string for now
// }
//   };

//   try {
//     const res = await axiosInstance.post("/auth/register", payload, {
//       withCredentials: true,
//     });
//      toast.success("Registration successful ✅");
//     window.location.href = "/login"; // redirect after register
//   } catch (error) {
//     const message = error.response?.data?.message || "Registration failed. Please try again.";
//     toast.error(message);
//     console.error("Registration error:", message);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Make avatar required
  if (!formState.avatar) {
    toast.error("Please upload an avatar image.");
    return;
  }

  const formData = new FormData();
  formData.append("fullName", formState.fullname);
  formData.append("username", formState.username);
  formData.append("email", formState.email);
  formData.append("password", formState.password);
  formData.append("bio", formState.bio);
  formData.append("city", formState.city);
  formData.append("nativeLanguage", formState.nativeLanguage);
  formData.append("desiredLanguage", formState.desiredLanguage);
  formData.append("avatar", formState.avatar); // ✅ actual file

  try {
    const res = await axiosInstance.post("/auth/register", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Important
      },
    });

    toast.success("Registration successful ✅");
    window.location.href = "/login"; // redirect after register
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed. Please try again.";
    toast.error(message);
    console.error("Registration error:", message);
  }
};



  const inputClass =
    "glass-input w-full px-4 py-2 bg-gray-900/60 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition";

  return (
    <div className="min-h-screen w-full bg-[#0a0518] text-white relative overflow-x-hidden">
      {/* Neon Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.1)] rounded-3xl p-6 sm:p-10 space-y-10 lg:space-y-0 lg:space-x-10">

          {/* Left Section */}
          <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:w-1/2 space-y-6 mt-[-40px]">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Welcome to NexusMeet
            </h1>
            <p className="text-lg text-gray-300 max-w-sm">
              Your gateway to global friendships and real-time language learning through voice and video conversations.
            </p>
            <img
              src="./Learning languages-bro (2).png"
              alt="Signup Illustration"
              className="w-64 sm:w-72 md:w-80 lg:w-96"
            />
          </div>

          {/* Right Section: Form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current.click()}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1e2634] border-2 border-dashed border-white hover:border-cyan-400 transition flex items-center justify-center overflow-hidden"
                >
                  {previewAvatar ? (
                    <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Camera className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </button>
                <input
                  type="file"
                  name="avatar"
                  ref={avatarInputRef}
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
                <span className="text-white text-sm mt-2">Upload Avatar</span>
              </div>

              <input type="text" name="fullname" placeholder="Full Name" value={formState.fullname} onChange={handleChange} className={inputClass} />
              <input type="text" name="username" placeholder="Username" value={formState.username} onChange={handleChange} className={inputClass} />
              <input type="email" name="email" placeholder="Email" value={formState.email} onChange={handleChange} className={inputClass} />
              <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange} className={inputClass} />
              <textarea name="bio" rows="2" placeholder="Bio" value={formState.bio} onChange={handleChange} className={inputClass}></textarea>
              <input type="text" name="city" placeholder="City" value={formState.city} onChange={handleChange} className={inputClass} />

              <select name="nativeLanguage" value={formState.nativeLanguage} onChange={handleChange}
                className={inputClass}>
                <option value="">Select Native Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-900 text-white">
                    {lang}
                  </option>
                ))}
              </select>

              <select name="desiredLanguage" value={formState.desiredLanguage} onChange={handleChange}
                className={inputClass}>
                <option value="">Select Desired Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-900 text-white">
                    {lang}
                  </option>
                ))}
              </select>

              {/* Gradient Submit Button */}
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center w-full py-3 px-6 text-lg font-bold text-black bg-cyan-400 rounded-full transition-all duration-300 overflow-hidden hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
              >
                <span className="absolute w-full h-full transition-all duration-500 ease-out bg-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0"></span>
                <span className="relative">Register</span>
              </button>

              <p className="text-sm text-gray-400 text-center mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-cyan-400 hover:underline">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
