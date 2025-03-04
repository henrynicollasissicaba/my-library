"use client"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import NoteDialogActions from './NoteDialogActions';
import { toast } from 'sonner';
import { deleteNoteAction } from '@/actions/note-actions';
import { showCustomAlert } from '../lib/sweetAlert';

export default function NoteDialogComponent({ noteId }: { noteId: number }){
    const [openDialog, setOpenDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    let title, confirmButtonText

    const handleDelete = async (noteId: number) => {
        title = "Deseja excluir essa anotação?"
        confirmButtonText = "Excluir"

        const result = await showCustomAlert({ title, confirmButtonText })

        if(result){
            setIsDeleting(true)
            try {
                toast.promise(deleteNoteAction(noteId), {
                    loading: "Excluindo anotação...",
                    success: "Anotação excluída com sucesso!"
                })

            } catch (error) {
                toast.error("Algo deu errado ao excluir a anotação. Tente novamente!")
                console.log(error)
            } finally {
                setIsDeleting(false)
                setOpenDialog(false)
            }
        }
    }

    return(
        <div>
            <MoreVertIcon 
                className="py-1 hover:bg-neutral-200 rounded-full transition-all cursor-pointer -mt-1" 
                fontSize="large"
                onClick={() => setOpenDialog(!openDialog)}
            />
            {openDialog && (
                <NoteDialogActions 
                    noteId={noteId} 
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    onCloseModal={() => setOpenDialog(false)}
                />
            )}
        </div>
    )
}