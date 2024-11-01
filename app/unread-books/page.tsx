"use client"

import BookCard from "../components/BookCard"
import Heading from "../components/Heading"
import { useLibrary } from "../hooks/useLibrary"

const Page = () => {
    const { unreadBooks } = useLibrary()

    return (
        <section className="pb-5">
            <Heading>Livros não lidos</Heading>
            {unreadBooks.length > 0 ? (
                <div className="flex flex-wrap gap-6">
                    {unreadBooks.map(({ name, author, numberOfPages, category, status, id }) => (
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
              Nenhum livro pendente para leitura foi encontrado.
            </p>
            )}
        </section>
    )
}

export default Page