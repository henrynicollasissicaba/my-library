import { getBooksAction, getTotalBooksAction } from "@/actions/book-actions"
import BookPagination from "@/app/components/ui/PaginationComponent"
import { GridBookCardHoverEffect } from "@/app/components/ui/GridBookCardHoverEffect"
import Heading from "@/app/components/ui/Heading"
import { BOOK_STATUS, BOOKS_PER_PAGE } from "@/models/Book"

export default async function ReadingBooksPage({ searchParams }: { searchParams: Promise<{ page: string }> }){
    const page = (await searchParams).page
    const currentPage = Number(page) || 1

    const bookStatus: BOOK_STATUS = BOOK_STATUS.READING

    const readingBooks = await getBooksAction(currentPage, bookStatus)
    const totalBooks = await getTotalBooksAction(bookStatus)
    
    const totalPages = totalBooks ? Math.ceil(totalBooks / BOOKS_PER_PAGE) : 0

    return(
        <main className="flex flex-col">
            <Heading title="Livros em" highlightWord="leitura"/>
            {readingBooks && readingBooks.length > 0 ? (
                <>
                    <GridBookCardHoverEffect books={readingBooks}/>
                    <div className="flex justify-center mb-2 mt-auto">
                        <BookPagination currentPage={currentPage} totalPages={totalPages}/>
                    </div>
                </>
            ) : (
                <span className="text-sm italic text-zinc-400 mt-4">
                    Não foram encontrados livros que você esteja lendo.
                </span>
            )}
        </main>
    )
}