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

export async function getBookById(bookId: number){
    const book = await prisma.book.findUnique({ where: { id: bookId } })
    return book
}

export async function updateBook(bookId: number, params: Partial<createBookParams>){
    await prisma.book.update({
        where: { id: bookId },
        data: params
    })
}

export async function startLecture(bookId: number){
    await prisma.book.update({
        where: { id: bookId },
        data: { status: 'Lendo' }
    })
}

export async function finishLecture(bookId: number){
    await prisma.book.update({
        where: { id: bookId },
        data: { status: 'Lido'}
    })
}

export async function deleteBook(bookId: number){
    await prisma.book.delete({ where: { id: bookId }})
}