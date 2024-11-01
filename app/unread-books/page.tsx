"use client"

import BookCard from "../components/BookCard"
import Heading from "../components/Heading"
import { useLibrary } from "../hooks/useLibrary"

const Page = () => {
    const { unreadBooks } = useLibrary()

    return (
        <section>
            <Heading>Livros não lidos</Heading>
            <div className="flex flex-wrap gap-6">
                {unreadBooks.map(({ name, author, numberOfPages, gender, status, id }) => (
                    <BookCard
                        key={id}
                        name={name}
                        author={author}
                        numberOfPages={numberOfPages}
                        gender={gender}
                        status={status}
                        id={id}
                    />
                ))}
            </div>
        </section>
    )
}

export default Page