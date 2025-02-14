"use server"

import { createNoteSchema, updateNoteSchema } from "@/schemas/noteSchema";
import * as Note from "@/models/Note"
import { z } from "zod"
import { revalidatePath } from "next/cache";

export async function createNoteAction(bookId: number, formData: FormData){
    try {
        const content = createNoteSchema.parse({
            content: formData.get('content')
        })

        await Note.createNote({ bookId, content: content.content })

        revalidatePath('/all-books/[bookId]', 'page')

        return { success: true }
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: 'Dados inválidos',
                details: error.errors
            };
        }

        return {
            success: false,
            error: 'Erro interno ao cadastrar um livro'
        };
    }
}

export async function updateNoteAction(noteId: number, formData: FormData){
    try {
        const content = updateNoteSchema.parse({
            content: formData.get('content')
        })

        if(!content.content) return

        await Note.updateNote({ noteId, content: content.content })

        revalidatePath('/all-books/[bookId]', 'page')

        return { success: true }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: 'Dados inválidos',
                details: error.errors
            };
        }

        return {
            success: false,
            error: 'Erro interno ao cadastrar um livro'
        };
    }
}

export async function getNotesAction(bookId: number, currentPage: number){
    const notes = await Note.getNotes(bookId, currentPage)
    return notes
}

export async function getNoteAction(noteId: number){
    const note = await Note.getNote(noteId)
    return note
}

export async function getTotalNotesByBookAction(bookId: number){
    const total = await Note.getTotalNotesByBook(bookId)
    return total
}

export async function deleteNoteAction(noteId: number){
    await Note.deleteNote(noteId)

    revalidatePath('/all-books/[bookId]', 'page')
}