import express from "express"
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { ENV } from "./util/env"
import {serve} from 'inngest/express'
import { inngest } from "./webhook/inngest"
const app = express()


app.use(cors({
    origin: ENV.client_url,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

// todo: adjust the helmet middleware
app.use(helmet())
app.use("/api/v1/inngest", serve({
    client: inngest,
    functions: [],
    signingKey: ENV.inngest_signin_key as string
}))

export default app;