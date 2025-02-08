"use server"

import * as Book from "@/models/Book";
import { createBookSchema } from "@/schemas/bookSchema";
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