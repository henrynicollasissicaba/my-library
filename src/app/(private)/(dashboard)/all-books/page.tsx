import * as Book from "@/models/Book"
import Heading from "@/app/components/ui/Heading"
import { getBooksAction, getTotalBooksAction } from "@/actions/book-actions"
import BookList from "@/app/components/sections/BookList"

export default async function AllBooksPage({ searchParams }: { searchParams: Promise<{ page: string }> }){
    const page = (await searchParams).page
    const currentPage = Number(page) || 1

    const books = await getBooksAction(currentPage)
    const totalBooks = await getTotalBooksAction()

    const totalPages = totalBooks ? Math.ceil(totalBooks / Book.BOOKS_PER_PAGE) : 0

    return(
        <main className="flex flex-col">
            <Heading title="Livros" highlightWord="cadastrados"/>
            {books && books.length > 0 ? (
                <BookList initialBooks={books} currentPage={currentPage} totalPages={totalPages} booksPerPage={Book.BOOKS_PER_PAGE}/>
            ) : (
                <span className="text-sm italic text-zinc-400 mt-4 ml-3">
                    Não foram encontrados livros cadastrados.
                </span>
            )}
        </main>
    )
}