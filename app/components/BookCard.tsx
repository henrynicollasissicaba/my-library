import React from 'react'
import Button from './Button'
import BookTags from './BookTags'
import { useLibrary } from '../hooks/useLibrary'

interface BookCardProps {
    name: string,
    author: string,
    numberOfPages: number,
    gender: string,
    status: string,
    id: number
}

const BookCard = ({ name, author, numberOfPages, gender, status, id }: BookCardProps) => {
    const { removeBook, markAsRead } = useLibrary() 

    return (
        <div className={`${status === "Lido" ? "border-green-500" : "border-red-600"}
        rounded-2xl bg-[#585858] p-4 border-l-[6px] shadow-md text-[#ecebeb] w-full min-h-min
        lg:w-[23rem] relative flex flex-col`}
        >
            <span className="rounded-full w-10 h-10 flex items-center justify-center bg-[#414141]
            text-[#ecebeb] absolute -top-4 -right-3 font-bold border-2 border-[#ecebeb]">
                {id}
            </span>
            <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-xl tracking-wide">{name}</h1>
                    <span className="py-2 px-4 bg-violet-300 text-violet-900 max-w-max rounded-3xl
                    font-bold">
                        {author}
                    </span>
                </div>
            </div>
            <BookTags gender={gender} numberOfPages={numberOfPages} status={status}/>
            <div className="mt-auto flex justify-between gap-4 flex-wrap">
                <Button
                    label="Excluir livro"
                    className="bg-red-300 text-red-600 hover:bg-red-600 hover:text-white
                    transition-colors"
                    onClick={() => removeBook(id)}
                />
                {status === "Não lido" && 
                    <Button
                        label="Marcar como lido"
                        className="bg-green-200 text-green-600 hover:bg-green-600 hover:text-white
                        transition-colors"
                        onClick={() => markAsRead(id)}
                    />}
            </div>
        </div>
    )
}

export default BookCard