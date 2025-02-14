import { getBookAction } from "@/actions/book-actions"
import { getNotesAction, getTotalNotesByBookAction } from "@/actions/note-actions"
import CreateNoteForm from "@/app/components/pages/CreateNoteForm"
import Heading from "@/app/components/ui/Heading"
import NotesCardHoverEffect from "@/app/components/ui/NotesCardHoverEffect"
import PaginationComponent from "@/app/components/ui/PaginationComponent"
import { NOTES_PER_PAGE } from "@/models/Note"

export default async function BookPage(
{ 
    params, 
    searchParams 
}: 
{ 
    params: Promise<{ bookId: string }>,
    searchParams: Promise<{ page: string }>
}){
    const bookId = +(await params).bookId
    const page = +(await searchParams).page
    const currentPage = Number(page) || 1

    const book = await getBookAction(bookId)
    if(!book) return <span className="text-sm italic text-zinc-400 mt-4 ml-3">Livro não encontrado.</span>

    const notes = await getNotesAction(bookId, currentPage)
    const totalNotes = await getTotalNotesByBookAction(bookId)

    const totalPages = totalNotes ? Math.ceil(totalNotes / NOTES_PER_PAGE) : 0

    return(
        <main className="flex flex-col gap-4 min-h-dvh">
            <Heading title="Anotações do livro: " highlightWord={book?.title}/>
            <CreateNoteForm bookId={book.id} />
            {notes && notes.length > 0 ? (
                <>
                    <NotesCardHoverEffect notes={notes}/>
                    <div className="flex justify-center mt-auto mb-2">
                        <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
                    </div>
                </>
            ) : (
                <span className="text-sm italic text-zinc-400 mt-4 ml-3">
                    Nenhuma anotação do livro "{book.title}" foi encontrado.
                </span>
            )}
        </main>
    )
}