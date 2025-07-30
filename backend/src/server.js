import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();
const app =express()
const PORT=process.env.PORT;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes)
  connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1); // exit if DB connection fails
  });