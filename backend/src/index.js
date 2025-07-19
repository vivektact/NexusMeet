import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

import app from "./app.js"

import db from './lib/db.js';
db()

const port = process.env.PORT || 5000



app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})