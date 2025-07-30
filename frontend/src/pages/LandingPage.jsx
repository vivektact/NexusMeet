import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/user/landing", {
          withCredentials: true,
        });
        setUser(res.data.user); // Set user data if logged in
      } catch (err) {
        console.error("Not authorized:", err.response?.data?.message || err.message);
        window.location.href = "/login"; // 🔐 Redirect if not logged in
      }
    };

    checkAuth();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold">Welcome, {user.fullName}</h1>
      <p>Email: {user.email}</p>
      <p>Native Language: {user.nativeLanguage}</p>
      <p>Learning: {user.desiredLanguage}</p>
    </div>
  );
};

export default LandingPage;
