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

export const BOOKS_PER_PAGE = 2

export async function getBooks(currentPage: number){
    const { userId } = await auth()
    if(!userId) return

    const books: Book[] = await prisma.book.findMany({
        where: {
            userId
        },
        take: BOOKS_PER_PAGE,
        skip: (currentPage - 1) * BOOKS_PER_PAGE,
        orderBy: {
            updatedAt: 'asc'
        }
    })

    return books
}

export async function getAllBooks(){
    const { userId } = await auth()
    if(!userId) return

    const allBooks = await prisma.book.findMany({ where: { userId } })
    return allBooks
}

export async function getSearchedBooks(search: string){
    const { userId } = await auth()
    if(!userId) return

    const searchedBooks: Book[] = await prisma.book.findMany({
        where: {
            userId,
            title: { contains: search, mode: 'insensitive' }
        },
        orderBy: {
            updatedAt: 'asc'
        }
    })

    return searchedBooks
}

export async function createBook(params: createBookParams){
    const { userId } = await auth()
    if(!userId) return

    await prisma.book.create({
        data: { ...params, userId }
    })
}

export async function getBookById(bookId: number){
    const book = await prisma.book.findUnique({ where: { id: bookId }})
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

export async function totalBooks(){
    const { userId } = await auth()
    if(!userId) return

    const total = await prisma.book.count({ where: { userId } })
    return total
}

export async function deleteBook(bookId: number){
    await prisma.book.delete({ where: { id: bookId }})
}