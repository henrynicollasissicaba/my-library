"use client"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import BookDialogActions from './BookDialogActions';
import { deleteBookAction, finishLectureAction, startLectureAction } from '@/actions/book-actions';
import { toast } from 'sonner';

export default function BookDialogComponent({ bookId, bookStatus }: { bookId: number, bookStatus: string }){
    const [openDialog, setOpenDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (bookId: number) => {
        setIsDeleting(true)

        try {
            toast.promise(deleteBookAction((bookId)), {
                loading: "Excluindo livro...",
                success: "Livro excluído com sucesso!"
            })

            setOpenDialog(false)

        } catch (error) {
            toast.error("Algo deu errado ao excluir o livro. Tente novamente!")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleStartLecture = async (bookId: number) => {
        try {
            toast.promise(startLectureAction(bookId), {
                loading: "Iniciando leitura do livro...",
                success: "Você iniciou a leitura do livro com sucesso!"
            })

        } catch (error) {
            toast.error("Algo deu errado ao iniciar a leitura. Tente novamente!")

        } finally {
            setOpenDialog(false)
        }
    }

    const handleFinishLecture = async (bookId: number) => {
        try {
            toast.promise(finishLectureAction(bookId), {
                loading: "Finalizando leitura do livro...",
                success: "Livro marcado como lido com sucesso!"
            })

        } catch (error) {
            toast.error("Algo deu errado ao marcar como lido. Tente novamente!")

        } finally {
            setOpenDialog(false)
        }
    }

    return(
        <div className="relative">
            <MoreVertIcon 
                className="py-1 hover:bg-neutral-200 rounded-full transition-all cursor-pointer -mt-1" 
                fontSize="large"
                onClick={() => setOpenDialog(!openDialog)}
            />
            {openDialog && (
                <BookDialogActions 
                    bookId={bookId} 
                    bookStatus={bookStatus}
                    onCloseModal={() => setOpenDialog(false)}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    onStartLecture={handleStartLecture}
                    onFinishLecture={handleFinishLecture}
                />
            )}
        </div>
    )
}