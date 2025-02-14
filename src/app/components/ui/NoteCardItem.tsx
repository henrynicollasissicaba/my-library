import { Note } from "@/models/Note";
import { useState } from "react";
import NoteDialogComponent from "../sections/NoteDialogComponent";

interface NotePropsItem {
    note: Note
}

export default function NoteCardItem({ note }: NotePropsItem){
    const [isExpanded, setIsExpanded] = useState(false)
    const maxLength = 400

    const shouldTuncateText = note.content.length > maxLength
    const displayText = isExpanded ? note.content : note.content.slice(0, maxLength)

    return(
        <>
            <div className="flex justify-between">
                <p className="text-sm whitespace-pre-line">
                    {displayText}
                    {!isExpanded && shouldTuncateText && (
                        <span className="text-primary-600">...</span>
                    )}
                </p>
                <NoteDialogComponent noteId={note.id}/>
            </div>
            {shouldTuncateText && (
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-primary-500 font-bold">
                    {isExpanded ? "Ler menos" : "Ler mais"}
                </button>
            )}
        </>
    )
}