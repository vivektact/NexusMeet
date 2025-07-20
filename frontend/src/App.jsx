import React from "react"
import { Route, Routes } from "react-router"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { axiosInstance } from "./lib/axios"

function App() {
  // tanstack query
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me")
      return res.data
    },
    retry: false, //auth checking
  })

  console.log(data)

  return (
    <div className="h-screen text-5xl" data-theme="forest">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
