"use server"

import * as Book from "@/models/Book";
import { createBookSchema, updateBookSchema } from "@/schemas/bookSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod"

export async function createBookAction(formData: FormData){
    try {
        // Validação dos dados
        const validatedData = createBookSchema.parse({
            title: formData.get('title'),
            author: formData.get('author'),
            number_of_pages: formData.get('number_of_pages'),
            category: formData.get('category'),
            status: formData.get('status')
        });

        // Criação do livro
        await Book.createBook(validatedData);

        // Revalidação do cache
        revalidatePath('/all-books');

        // Retorno de sucesso
        return { success: true };

    } catch (error) {
        // Tratamento específico para erros de validação
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

export async function getBook(bookId: number){
    const book = await Book.getBookById(bookId)
    return book
}

export async function updateBookAction(bookId: number, formData: FormData){
    try {
        const validatedData = updateBookSchema.parse({
            title: formData.get('title'),
            author: formData.get('author'),
            number_of_pages: formData.get('number_of_pages'),
            category: formData.get('category')
        })

        await Book.updateBook(bookId, validatedData)

        revalidatePath('/all-books')

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

export async function startLectureAction(bookId: number){
    await Book.startLecture(bookId)

    revalidatePath('/all-books')
}

export async function finishLectureAction(bookId: number){
    await Book.finishLecture(bookId)

    revalidatePath('/all-books')
}

export async function deleteBookAction(bookId: number){
    await Book.deleteBook(bookId)

    revalidatePath('/all-books')
}