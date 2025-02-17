"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Input from '../ui/Input';
import { ShinyButton } from '../ui/ShinyButton';
import { toast } from "sonner";
import { getNoteAction, updateNoteAction } from "@/actions/note-actions";
import { updateNoteSchema } from "@/schemas/noteSchema";

interface ConfirmationNoteModalProps {
  open: boolean;
  onClose: () => void;
  onCloseModal: () => void
  noteId: number
}

type UpdateNoteFormData = z.infer<typeof updateNoteSchema>

export default function ConfirmationNoteModal({
  open,
  onClose,
  onCloseModal,
  noteId
}: ConfirmationNoteModalProps) {
    const [content, setContent] = useState("")
    const [isLoadingContent, setIsLoadingContent] = useState(true)

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateNoteFormData>({
            resolver: zodResolver(updateNoteSchema)
    })

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const content = await getNoteAction(noteId)
                if(!content) return
                setContent(content?.content)

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoadingContent(false)
            }
        }

        fetchNote()
    }, [noteId])

    useEffect(() => {
        const errorMessages = Object.values(errors).map(error => error?.message)

        errorMessages.map((error) => {
            toast.error(error)
        })
    }, [errors])

    const onSubmit = async (data: UpdateNoteFormData) => {
        try {
            const formData = new FormData()
            formData.append('content', data.content)

            toast.promise(updateNoteAction(noteId, formData), {
                loading: "Atualizando anotação...",
                success: "Anotação atualizada com sucesso!"
            })

        } catch (error) {
            toast.error("Erro ao atualizar uma anotação!")
            console.log(error)

        } finally {
            onClose()
            onCloseModal()
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
                Atualizar <span className="text-primary-600">anotação</span>
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm">
                <Input
                    {...register("content")}
                    multiline
                    rows={7}
                    autoComplete="off"
                    label="Anotação"
                    fullWidth 
                    size="small"
                    error={!!errors.content}
                    value={isLoadingContent ? "Carregando anotação atual, aguarde..." : content}
                    disabled={isLoadingContent}
                    onChange={(e) => setContent(e.target.value)}
                    className="disabled:bg-stone-300 disabled:cursor-not-allowed"
                />
                <ShinyButton type="submit">Atualizar anotação</ShinyButton>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}