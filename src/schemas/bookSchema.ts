import { z } from "zod"

export const booksCategory = [
    "Administração e Economia", "Autoajuda", "Educação e Didáticos", "Fantasia e Horror", "HQs e Mangás", "Infantil",
    "Internacionais", "Literatura e Ficção", "Religião e Espiritualidade", "Romance", "Saúde e Medicina",
    "Política e Filosofia", "Biografia", "Gastronomia", "Tecnologia", "História e Geografia"
] as const

export const bookStatus = [
    "Lido", "Lendo", "Não lido"
] as const

export const createBookSchema = z.object({
    title: z.string().min(1, "O * TÍTULO * do livro é obrigatório.").max(255, "O título do livro deve ter no máximo 255 caracteres."),
    author: z.string().min(1, "O * AUTOR * do livro é obrigatório.").max(255, "O autor do livro deve ter no máximo 255 caracteres."),
    number_of_pages: z.string()
                    .min(1, "O * NÚMERO DE PÁGINAS * é obrigatório")
                    .transform((val) => Number(val))
                    .refine((val) => val > 0 && val < 4000, "O * NÚMERO DE PÁGINAS * deve estar entre 1 e 4000"),
    category: z.enum(booksCategory),
    status: z.enum(bookStatus)
})

export const updateBookSchema = z.object({
    title: z.string().min(1, "O * TÍTULO * do livro é obrigatório.").max(255, "O título do livro deve ter no máximo 255 caracteres.").optional(),
    author: z.string().min(1, "O * AUTOR * do livro é obrigatório.").max(255, "O autor do livro deve ter no máximo 255 caracteres.").optional(),
    number_of_pages: z.string()
                    .min(1, "O * NÚMERO DE PÁGINAS * é obrigatório")
                    .transform((val) => Number(val))
                    .refine((val) => val > 0 && val < 4000, "O * NÚMERO DE PÁGINAS * deve estar entre 1 e 4000").optional(),
    category: z.enum(booksCategory).optional()
})