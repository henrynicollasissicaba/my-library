"use client"

import Heading from '../components/Heading'
import { useLibrary } from '../hooks/useLibrary'
import BookCard from '../components/BookCard'

const Page = () => {
    const { readBooks } = useLibrary()

    return (
        <section>
            <Heading>Livros Lidos</Heading>
            <div className="flex flex-wrap gap-6">
                {readBooks.map(({ name, author, numberOfPages, gender, status, id }) => (
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