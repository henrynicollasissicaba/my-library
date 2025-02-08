import { prisma } from "@/database/prisma-client"
import { auth } from "@clerk/nextjs/server"

export interface Book {
    id: number
    title: string
    author: string
    number_of_pages: number
    category: string
    status: string
}

export interface createBookParams {
    title: string
    author: string
    number_of_pages: number
    category: string
    status: string
}

export async function getBooks(userId: string){
    const books: Book[] = await prisma.book.findMany({ where: { userId } })
    return books
}

export async function createBook(params: createBookParams){
    const { userId } = await auth()
    if(!userId) return

    await prisma.book.create({
        data: { ...params, userId }
    })
}