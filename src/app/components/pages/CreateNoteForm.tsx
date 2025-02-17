"use client"

import { createNoteSchema } from "@/schemas/noteSchema";
import Input from "../ui/Input";
import { ShinyButton } from "../ui/ShinyButton";
import { customInputColors } from "./CreateBookForm";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/note-actions";

type CreateNoteFormData = z.infer<typeof createNoteSchema>

export default function CreateNoteForm({ bookId }: { bookId: number }){
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateNoteFormData>({ 
        resolver: zodResolver(createNoteSchema) 
    })

    useEffect(() => {
        const errorMessages = Object.values(errors).map(error => error?.message)

        errorMessages.map((error) => {
            toast.error(error)
        })
    }, [errors])

    const onSubmit = async (data: CreateNoteFormData) => {
        try {
            const formData = new FormData()
            formData.append("content", data.content)

            toast.promise(createNoteAction(bookId, formData), {
                loading: "Criando anotação...",
                success: "Anotação criada com sucesso!"
            })
            
            reset()
        } catch (error) {
            toast.error("Erro ao criar uma anotação!")
            console.log(error)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-[#1D1D21] mt-5 rounded-lg border-l-2 border-primary-600 flex flex-col gap-8">
            <Input 
                multiline
                fullWidth
                size="small"
                rows={7}
                label="Escreva uma anotação"
                variant="outlined"
                colors={customInputColors}
                {...register("content")}
                error={!!errors.content}
            />
            <div className="block ml-auto md:max-w-[48.5%] w-full">
                <ShinyButton type="submit" className="dark w-full">Criar anotação</ShinyButton>
            </div>
        </form>
    )
}