import * as Book from "@/models/Book"
import Heading from "@/app/components/ui/Heading"
import { getBooksAction, getTotalBooksAction } from "@/actions/book-actions"
import BookList from "@/app/components/sections/BookList"

export default async function AllBooksPage({ searchParams }: { searchParams: Promise<{ page: string }> }){
    const page = (await searchParams).page
    const currentPage = Number(page) || 1

    const totalBooks = await getTotalBooksAction()
    if(!totalBooks) return

    const books = await getBooksAction(currentPage)
    if(!books) return

    return(
        <main className="flex flex-col x-full min-h-dvh">
            <Heading title="Livros" highlightWord="cadastrados"/>
            <BookList initialBooks={books} currentPage={currentPage} totalBooks={totalBooks} booksPerPage={Book.BOOKS_PER_PAGE}/>
        </main>
    )
}