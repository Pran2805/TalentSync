import express from "express"
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

const app = express()

// injecting all the important middleware
app.use(express.json())
app.use(cookieParser())
app.use(helmet())

export default app;