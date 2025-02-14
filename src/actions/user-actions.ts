"use server"

import * as User from "@/models/User";

export async function getUserAction(user: User.User){
    const currentUser = await User.getUser(user)
    return currentUser
}