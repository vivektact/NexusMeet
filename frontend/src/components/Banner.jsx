import React from "react"
import hero from "/hero.png"
import { Link, Navigate, useNavigate } from "react-router"

function Banner() {
  const navigate = useNavigate()

  const handleSignupClick = () => {
    navigate("/signup")
  }
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row py-10 bg-base-100">
        <div className="w-full order-2 md:order-1 md:w-1/2 md:mt-32 md:mr-32">
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Hello, welcome here to explore & learn {"  "}
              <span className="text-primary">new languages !!!</span>
            </h1>
            <p className="text-xl">
              From casual chats to meaningful language exchanges, NexusMeet
              connects you with people passionate about language learning.
              Practice, learn, and grow — all through real conversations that
              build fluency and friendship. Your language journey starts with a
              single connection.
            </p>
          </div>

          <button
            className="btn btn-secondary mt-6 "
            onClick={handleSignupClick}
          >
            Get Started
          </button>
        </div>
        <div className="order-1 w-full md:w-1/2 md:ml-30 ">
          <img
            src={hero}
            className="w-80 h-80 md:w-[500px] md:h-[600px] rounded-xl"
          ></img>
        </div>
      </div>
    </>
  )
}

export default Banner
