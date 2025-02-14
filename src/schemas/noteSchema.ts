import { z } from "zod"

export const createNoteSchema = z.object({
    content: z.string()
        .min(1, "O * CONTEÚDO * da anotação é obrigatório.")
        .max(5000, "O conteúdo da anotação deve ter no máximo 5000 caracteres.")
})

export const updateNoteSchema = z.object({
    content: z.string()
        .min(1, "O * CONTEÚDO * da anotação é obrigatório.")
        .max(5000, "O conteúdo da anotação deve ter no máximo 5000 caracteres.")
})