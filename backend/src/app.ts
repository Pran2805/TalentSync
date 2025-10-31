import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { ENV } from "./util/env"
import { serve } from 'inngest/express'
import { inngest, functions } from "./webhook/inngest"
import { createServer } from "http"
import path from "path"
import router from "./route/index"
import { Server } from "socket.io"
import { clerkMiddleware } from '@clerk/express'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: ENV.client_url,
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
  })

  socket.on('send-message', (data) => {
    socket.to(data.roomId).emit('receive-message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})
if (ENV.node_env === "development") {
  app.use(helmet({ contentSecurityPolicy: false }))
}
app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(clerkMiddleware())
app.use(cookieParser())
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}))


app.use("/api/v1/inngest", serve({
  client: inngest,
  functions,
  signingKey: ENV.inngest_signin_key as string
}))

app.use("/api/v1", router)

app.use("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" })
})
if (ENV.node_env === "production") {
  const projectRoot = process.cwd()
  app.use(express.static(path.join(projectRoot, "../frontend/dist")))
  
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(projectRoot, "../frontend", "dist" , "index.html"))
  })
}

export { io, server }