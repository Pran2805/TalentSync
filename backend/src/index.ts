import app from "./app";
import router from "./route";
import { ENV } from "./util/env";


app.use("/api/v1", router)

const port = ENV.port || 5000

app.listen(port, ()=>{
    console.log('Server is running on Port', port)
})