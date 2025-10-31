import { Inngest } from "inngest"
import prisma from "../db/prisma"

export const inngest = new Inngest({ id: "TalentSync" });

const syncUser = inngest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = await event.data;
    const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        avatar: image_url
    }

    const user = await prisma.user.create({
        data: newUser
    })
})
const deleteUser = inngest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.deleted" }, async ({ event }) => {
    const id: string = await event.data.id;

    const user = await prisma.user.delete({
        where:{
            clerkId: id
        }
    })

    // todo: do something here
})

export const functions = [syncUser, deleteUser]