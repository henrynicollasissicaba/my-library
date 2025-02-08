import { z } from "zod"

export const createBookSchema = z.object({
    title: z.string().min(1, "O * TÍTULO * do livro é obrigatório.").max(100, "O título do livro deve ter no máximo 100 caracteres."),
    author: z.string().min(1, "O * AUTOR * do livro é obrigatório.").max(100, "O autor do livro deve ter no máximo 100 caracteres."),
    number_of_pages: z.string()
                    .min(1, "O * NÚMERO DE PÁGINAS * é obrigatório")
                    .transform((val) => Number(val))
                    .refine((val) => val > 0 && val < 4000, "O * NÚMERO DE PÁGINAS * deve estar entre 1 e 4000"),
    category: z.enum([
        "Administração e Economia", "Autoajuda", "Educação e Didáticos", "Fantasia e Horror", "HQs e Mangás", "Infantil",
        "Internacionais", "Literatura e Ficção", "Religião e Espiritualidade", "Romance", "Saúde e Medicina",
        "Política e Filosofia", "Biografia", "Gastronomia", "Tecnologia"
    ]),
    status: z.enum([
        "Lido", "Lendo", "Não lido"
    ])
})