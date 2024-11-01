"use client"

import Heading from '../components/Heading'
import { useLibrary } from '../hooks/useLibrary'
import BookCard from '../components/BookCard'

const Page = () => {
    const { readBooks } = useLibrary()

    return (
        <section className="pb-5">
            <Heading>Livros Lidos</Heading>
            {readBooks.length > 0 ? (
                <div className="flex flex-wrap gap-6">
                    {readBooks.map(({ name, author, numberOfPages, category, status, id }) => (
                        <BookCard
                            key={id}
                            name={name}
                            author={author}
                            numberOfPages={numberOfPages}
                            category={category}
                            status={status}
                            id={id}
                        />
                    ))}
                </div>
            ):(
            <p className="text-lg text-[#ecebeb] font-medium">
              Nenhum livro lido.
            </p>
            )}
        </section>
    )
}

export default Page