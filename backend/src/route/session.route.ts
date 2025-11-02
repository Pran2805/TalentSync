import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute";
import {
createSession,
getActiveSession,
getMyRecentSession,
getSessionById,
joinSession,
endSession
} from '../controller/session.controller'
const sessionRouter = Router()

sessionRouter.use(protectRoute)


sessionRouter.post("/",createSession)
sessionRouter.get("/active",getActiveSession)
sessionRouter.get("/my-recent",getMyRecentSession)
sessionRouter.get("/:id", getSessionById)
sessionRouter.get("/:id/join", joinSession)
sessionRouter.get("/:id/end", endSession)

export default sessionRouter