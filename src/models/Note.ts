import { prisma } from "@/database/prisma-client";
import { auth } from "@clerk/nextjs/server";

export interface Note {
    id: number
    content: string
}

export interface CreateNoteParams {
    bookId: number
    content: string
}

export interface UpdateNoteParams {
    noteId: number
    content: string
}

export const NOTES_PER_PAGE = 6

export async function createNote({ bookId, content }: CreateNoteParams){
    await prisma.note.create({
        data: { 
            bookId: bookId,
            content: content
        }
    })
}

export async function updateNote({ noteId, content }: UpdateNoteParams){
    await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            content
        }
    })
}

export async function getNotes(bookId: number, currentPage: number){
    const notes: Note[] = await prisma.note.findMany({
        where: {
            bookId
        },
        take: NOTES_PER_PAGE,
        skip: (currentPage - 1) * NOTES_PER_PAGE,
        orderBy: {
            updatedAt: 'desc'
        }
    })

    return notes
}

export async function getNote(noteId: number){
    const note = await prisma.note.findUnique({ where: { id: noteId } })
    return note
}

export async function getTotalNotes(){
    const { userId } = await auth()
    if(!userId) return

    const total = await prisma.note.count({
        where: {
            book: {
                userId
            }
        }
    })

    return total
}

export async function getTotalNotesByBook(bookId: number){
    const total = await prisma.note.count({ where: { bookId }})
    return total
}

export async function deleteNote(noteId: number){
    await prisma.note.delete({ where: { id: noteId }})
}