import path from "path";
import router from "./route/index";
import app from "./app";
import { ENV } from "./util/env";
import express, { Request, Response } from 'express'

app.use("/api/v1", router)
app.use("/health", (_req:Request, res: Response) =>{
    res.send("HEllo World")
})
const port = ENV.port || 5000

const projectRoot = process.cwd();

if (ENV.node_env === "production") {
    app.use(express.static(path.join(projectRoot, "../frontend/dist")))
    app.get("/{*any}", (_req: Request, res: Response) => {
        res.sendFile(path.join(projectRoot, "../frontend/dist/index.html"))
    })
}

app.listen(port, () => {
    console.log('Server is running on Port', port)
})