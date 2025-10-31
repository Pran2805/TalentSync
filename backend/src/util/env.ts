import * as dotenv from 'dotenv'
dotenv.config({ quiet: true })

// just because lot's of error face in previous project
// becaues of forgotting dotenv config or misspell env file
export const ENV = {
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    inngest_event_key: process.env.INNGEST_EVENT_KEY,
    inngest_signin_key: process.env.INNGEST_SIGNIN_KEY,
    clerk_publishable_key: process.env.CLERK_PUBLISHABLE_KEY,
    clerk_secret_key: process.env.CLERK_SECRET_KEY,
    client_url: process.env.CLIENT_URL

}