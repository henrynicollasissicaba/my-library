"use client"

import BookCard from "../components/BookCard"
import Heading from "../components/Heading"
import { useLibrary } from "../hooks/useLibrary"

const Page = () => {
    const { unreadBooks } = useLibrary()

    return (
        <section className="pb-5 min-h-[calc(100vh-340px)]">
            <Heading>Livros não lidos</Heading>
            {unreadBooks.length > 0 ? (
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
            ):(
            <p className="text-lg text-[#ecebeb] font-medium">
              Nenhum livro pendente para leitura foi encontrado.
            </p>
            )}
        </section>
    )
}

export default Page