import express from "express"
import {Router} from "express"
import userRoutes from "./userRoutes.js"
import chatUser from "./chatRoutes.js"

const appRouter = Router()


appRouter.use(express.json())


appRouter.use("/user",userRoutes)
appRouter.use("/chat",chatUser)



export default appRouter