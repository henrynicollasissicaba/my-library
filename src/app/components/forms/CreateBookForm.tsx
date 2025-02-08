"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import Input from "../Input";
import MenuItem from '@mui/material/MenuItem';
import { ShinyButton } from "../ShinyButton";
import { createBookAction } from "@/actions/book-actions";
import { createBookSchema } from "@/schemas/bookSchema";
import { toast } from "sonner";
import { useEffect } from "react";

const customInputColors = {
    border: "#fff",
    hoverBorder: "#2f67ff",
    focusedBorder: "#2f67ff",
    focusedLabel: "#2f67ff",
    inputText: "#fff",
    helperText: "#fff"
};

const booksCategory = [
    "Administração e Economia", "Autoajuda", "Educação e Didáticos", "Fantasia e Horror", "HQs e Mangás", "Infantil",
    "Internacionais", "Literatura e Ficção", "Religião e Espiritualidade", "Romance", "Saúde e Medicina",
    "Política e Filosofia", "Biografia", "Gastronomia", "Tecnologia"
]

const bookStatus = [
    "Lido", "Lendo", "Não lido"
]

type CreateBookFormData = z.infer<typeof createBookSchema>

export default function CreateBookForm(){
    const { register, handleSubmit, formState: { errors } } = useForm<CreateBookFormData>({
        resolver: zodResolver(createBookSchema)
    })

    useEffect(() => {
        const errorMessages = Object.values(errors).map(error => error?.message)

        errorMessages.map((error) => {
            toast.error(error)
        })
    }, [errors])

    const onSubmit = async (data: CreateBookFormData) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value.toString())
            })

            await createBookAction(formData)

            toast.success("Livro cadastrado com sucesso!")
        } catch (error) {
            toast.error("Erro ao cadastrar um livro")
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-[#1D1D21] mt-10 rounded-lg border-l-2 border-white flex flex-col gap-8">
            <Input
                label="Título"
                {...register("title")}
                colors={customInputColors}
                size="small"
                variant="outlined"
                autoComplete="off"
                error={!!errors.title}
                fullWidth
            />
            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Autor"
                    {...register("author")}
                    colors={customInputColors}
                    size="small"
                    variant="outlined"
                    autoComplete="off"
                    error={!!errors.author}
                    fullWidth
                />
                <Input
                    label="Número de páginas"
                    {...register("number_of_pages")}
                    colors={customInputColors}
                    size="small"
                    variant="outlined"
                    autoComplete="off"
                    error={!!errors.number_of_pages}
                    fullWidth
                />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    select
                    label="Categoria"
                    {...register("category")}
                    helperText="* Selecione a categoria do livro"
                    defaultValue={booksCategory[0]}
                    size="small"
                    fullWidth
                    error={!!errors.category}
                    colors={customInputColors}
                >
                    {booksCategory.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Input>
                <Input
                    select
                    label="Status"
                    {...register("status")}
                    helperText="* Selecione o status do livro"
                    defaultValue={bookStatus[2]}
                    size="small"
                    fullWidth
                    error={!!errors.status}
                    colors={customInputColors}
                >
                    {bookStatus.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Input>
            </div>
            <div className="block ml-auto md:max-w-[48.5%] w-full mt-5">
                <ShinyButton type="submit" className="dark w-full">Cadastrar livro</ShinyButton>
            </div>
        </form>
    )
}