import express from "express"
import {config} from "dotenv"
import appRouter from "./routes/router.js"
import cookieParser from "cookie-parser"
import cors from "cors"
config()
const app = express()

app.use(cors({origin:"https://effortless-starburst-95d285.netlify.app",credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use("/api/v1/",appRouter)









export default app