import * as dotenv from 'dotenv'
dotenv.config({quiet:true})

// just because lot's of error face in previous project
// becaues of forgotting dotenv config or misspell env file
export const ENV = {
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV
}