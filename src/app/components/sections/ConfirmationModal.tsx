"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Input from '../ui/Input';
import { getBookAction, updateBookAction } from '@/actions/book-actions';
import { booksCategory, updateBookSchema } from '@/schemas/bookSchema';
import { MenuItem } from '@mui/material';
import { ShinyButton } from '../ui/ShinyButton';
import { toast } from "sonner";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onCloseModal: () => void
  bookId: number
}

type UpdateBookFormData = z.infer<typeof updateBookSchema>

export default function ConfirmationModal({
  open,
  onClose,
  onCloseModal,
  bookId
}: ConfirmationModalProps) {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [category, setCategory] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateBookFormData>({
            resolver: zodResolver(updateBookSchema)
    })

    useEffect(() => {
        getBookAction(bookId).then((book) => {
            if(book){
                setTitle(book.title)
                setAuthor(book.author)
                setNumberOfPages(book.number_of_pages)
                setCategory(book.category)
            }
        })
    }, [bookId])

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
                formData.append(key, value.toString())
            })

            toast.promise(updateBookAction(bookId, formData), {
                loading: "Atualizando livro..."
            })

            toast.success("Livro atualizado com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar um livro")
        } finally {
            onClose()
            onCloseModal()
        }
    }

    const handleNumberOfPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        const numValue = value ? Number(value) : 0
        
        if (numValue < 4000) { 
            setNumberOfPages(numValue)
        }
    }

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
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input 
                    {...register("author")}
                    autoComplete="off"
                    label="Autor" 
                    fullWidth 
                    size="small" 
                    error={!!errors.author}
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <Input
                    {...register("number_of_pages")}
                    autoComplete="off" 
                    label="Número de páginas" 
                    fullWidth 
                    size="small"
                    error={!!errors.number_of_pages}
                    value={numberOfPages} 
                    onChange={handleNumberOfPagesChange}
                />
                <Input
                    {...register("category")}
                    select
                    label="Categoria"
                    helperText="* Selecione a categoria do livro"
                    error={!!errors.category}
                    defaultValue={category}
                    onChange={(e) => setCategory(e.target.value)}
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