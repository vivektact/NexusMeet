import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/user.routes.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use("/api/v1/auth", authRouter)




export default app