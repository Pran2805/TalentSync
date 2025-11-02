import { Router } from "express";
import chatRouter from "./chat.route";
import sessionRouter from './session.route'
const router = Router()

router.use("/chat", chatRouter)
router.use("/session", sessionRouter)

export default router;