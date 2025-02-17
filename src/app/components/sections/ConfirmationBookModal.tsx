"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Input from '../ui/Input';
import { getBookAction, updateBookAction } from '@/actions/book-actions';
import { booksCategory, updateBookSchema } from '@/schemas/bookSchema';
import { MenuItem } from '@mui/material';
import { ShinyButton } from '../ui/ShinyButton';
import { toast } from "sonner";

interface ConfirmationBookModalProps {
  open: boolean;
  onClose: () => void;
  onCloseModal: () => void
  bookId: number
}

type UpdateBookFormData = z.infer<typeof updateBookSchema>

export default function ConfirmationBookModal({
  open,
  onClose,
  onCloseModal,
  bookId
}: ConfirmationBookModalProps) {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateBookFormData>({
            resolver: zodResolver(updateBookSchema), mode: "onChange"
    })

    useEffect(() => {
        try {
            getBookAction(bookId).then((book) => {
                if(book){
                    setValue("title", book.title)
                    setValue("author", book.author)
                    setValue("number_of_pages", Number(book.number_of_pages))
                    setValue("category", book.category || booksCategory[0])
                }
            })
        } catch (error) {
            console.log(error)
        }

    }, [bookId, setValue])

    useEffect(() => {
        const errorMessages = Object.values(errors).map(error => error?.message)

        errorMessages.map((error) => {
            toast.error(error)
        })
    }, [errors])

    const onSubmit = async (data: UpdateBookFormData) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if(value !== undefined){
                    formData.append(key, value.toString())
                }
            })

            toast.promise(updateBookAction(bookId, formData), {
                loading: "Atualizando livro...",
                success: "Livro atualizado com sucesso!"
            })

        } catch (error) {
            toast.error("Erro ao atualizar um livro")
            console.log(error)
        } finally {
            onClose()
            onCloseModal()
        }
    }

    const handleNumberOfPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        const numValue = value ? Number(value) : 0
        
        if (numValue < 4000) { 
            setValue("number_of_pages", numValue)
        }
    }

    const numberOfPages = watch("number_of_pages")
    const category = watch("category") || ""

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="w-[40rem] max-w-full bg-stone-200">
        <div>
            <h1 
                className="text-xl font-bold mb-5 text-center"
            >
                Atualizar <span className="text-primary-600">livro</span>
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm">
                <Input
                    {...register("title")}
                    autoComplete="off"
                    label="Título" 
                    fullWidth 
                    size="small"
                    error={!!errors.title}
                    slotProps={{ inputLabel: { shrink: Boolean(watch("title")) } }}
                />
                <Input 
                    {...register("author")}
                    autoComplete="off"
                    label="Autor" 
                    fullWidth 
                    size="small" 
                    error={!!errors.author}
                    slotProps={{ inputLabel: { shrink: Boolean(watch("author")) } }}
                />
                <Input
                    {...register("number_of_pages")}
                    autoComplete="off" 
                    label="Número de páginas" 
                    fullWidth 
                    size="small"
                    error={!!errors.number_of_pages}
                    value={numberOfPages || ""}
                    onChange={handleNumberOfPagesChange}
                    type="number"
                />
                <Input
                    {...register("category")}
                    select
                    label="Categoria"
                    helperText="* Selecione a categoria do livro"
                    error={!!errors.category}
                    value={category}
                    size="small"
                    fullWidth
                >
                    {booksCategory.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Input>

                <ShinyButton type="submit">Atualizar livro</ShinyButton>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}