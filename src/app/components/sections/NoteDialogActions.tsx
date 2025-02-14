"use client"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ConfirmationNoteModal from './ConfirmationNoteModal';

interface NoteDialogActionProps {
    noteId: number
    isDeleting: boolean
    onCloseModal: () => void
    onDelete?: (noteId: number) => Promise<void>
}

export default function NoteDialogActions(params: NoteDialogActionProps){
    const [openUpdateNoteFormDialog, setOpenUpdateNoteFormDialog] = useState(false)

    return(
        <div className="absolute top-2 right-8 p-1 bg-neutral-200 gap-1 z-50 w-40 text-sm flex flex-col">
            <button className="bg-neutral-300 px-6 py-3 flex items-center justify-center gap-2 
                hover:text-yellow-400 transition-colors"
                onClick={() => setOpenUpdateNoteFormDialog(!openUpdateNoteFormDialog)}
            >
                <EditIcon fontSize="small"/>
                <span>Editar</span>
            </button>
            <button className="bg-neutral-300 px-6 py-3 flex items-center justify-center gap-2 
                hover:text-red-600 transition-colors"
                onClick={() => params.onDelete?.(params.noteId)}
            >
                <DeleteIcon fontSize="small"/>
                <span>Excluir</span>
            </button>

            {openUpdateNoteFormDialog && (
                <ConfirmationNoteModal 
                    noteId={params.noteId}
                    open={openUpdateNoteFormDialog}
                    onClose={() => setOpenUpdateNoteFormDialog(false)}
                    onCloseModal={params.onCloseModal}
                />
            )}
        </div>
    )
}