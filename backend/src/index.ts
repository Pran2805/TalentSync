import app from "./app";
import { ENV } from "./util/env";


const port = ENV.port || 5000

app.listen(port, () => {
    console.log('Server is running on Port', port)
})