import { auth } from "@clerk/nextjs/server"
import * as Book from "@/models/Book"
import Heading from "@/app/components/ui/Heading"
import { GridBookCardHoverEffect } from "@/app/components/ui/GridBookCardHoverEffect"

export default async function AllBooksPage(){
    const { userId } = await auth()
    if(!userId) return

    const books = await Book.getBooks(userId)

    return(
        <main>
            <Heading title="Livros" highlightWord="cadastrados"/>
            <GridBookCardHoverEffect books={books} />
        </main>
    )
}