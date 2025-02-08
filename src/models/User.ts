import { prisma } from "../database/prisma-client";

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
}

export async function createUser(user: User){
    await prisma.user.create({ 
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
     })
}

export async function getUser(user: User){
    const currentUser = await prisma.user.findUnique({ where: { id: user.id } })

    if(!currentUser) await createUser(user)
    
    return currentUser
}