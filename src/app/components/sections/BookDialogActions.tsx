'use client'

import Link from "next/link"

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";
import ConfirmationModal from "./ConfirmationBookModal";

interface BookDialogActionsProps {
    bookId: number
    bookStatus: string
    isDeleting: boolean
    onCloseModal: () => void
    onDelete?: (bookId: number) => Promise<void>
    onStartLecture?: (bookId: number) => Promise<void>
    onFinishLecture?: (bookId: number) => Promise<void>
}

export default function BookDialogActions(params: BookDialogActionsProps){
    const [openUpdateBookFormDialog, setOpenUpdateBookFormDialog] = useState(false)

    return(
        <div className="absolute top-2 right-7 p-1 bg-neutral-200 grid grid-cols-2 gap-1 z-10 w-52 text-sm">
            {(params.bookStatus === "Lendo" || params.bookStatus === "Lido") && (
                <Link 
                    href={`/all-books/${params.bookId}`}
                    scroll={false}
                    className="col-span-2 bg-neutral-300 justify-center py-3 flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                    <TextSnippetIcon fontSize="small"/>
                    <span>Anotações</span>
                </Link>
            )}

            <button 
                className="col-span-1 bg-neutral-300 px-6 py-3 flex items-center justify-center gap-2 
                hover:text-yellow-400 transition-colors"
                onClick={() => setOpenUpdateBookFormDialog(!openUpdateBookFormDialog)}
            >
                <EditIcon fontSize="small"/>
                <span>Editar</span>
            </button>

            <button 
                className="col-span-1 bg-neutral-300 px-6 py-3 flex items-center justify-center gap-1 
                    hover:text-red-600 transition-colors disabled:cursor-not-allowed 
                    disabled:text-red-700 disabled:bg-neutral-200"
                onClick={() => params.onDelete?.(params.bookId)}
                disabled={params.isDeleting}
            >
                <DeleteIcon fontSize="small"/>
                <span>Excluir</span>
            </button>

            {params.bookStatus === "Não lido" && (
                <button 
                    className="col-span-2 bg-blue-500 hover:bg-blue-700 transition-colors py-3 text-white flex 
                    items-center justify-center gap-3"
                    onClick={() => params.onStartLecture?.(params.bookId)}
                >
                    <PlayArrowIcon fontSize="small"/>
                    <span>Iniciar leitura</span>
                </button>
            )}
            
            {params.bookStatus === "Lendo" && (
                <button 
                    className="col-span-2 bg-green-500 hover:bg-green-700 transition-colors py-3 
                    text-white flex items-center justify-center gap-3"
                    onClick={() => params.onFinishLecture?.(params.bookId)}
                >
                    <CheckCircleIcon fontSize="small"/>
                    <span>Finalizar leitura</span>
                </button>
            )}

            <ConfirmationModal 
                open={openUpdateBookFormDialog}
                onCloseModal={params.onCloseModal}
                onClose={() => setOpenUpdateBookFormDialog(false)}
                bookId={params.bookId}
            />
        </div>
    )
}