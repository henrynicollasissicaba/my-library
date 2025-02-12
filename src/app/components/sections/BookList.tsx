"use client"

import { Book } from "@/models/Book"
import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import { GridBookCardHoverEffect } from "../ui/GridBookCardHoverEffect"
import BookPagination from "../ui/BookPagination"
import { getAllBooksAction } from "@/actions/book-actions"
interface BookListProps {
    initialBooks: Book[]
    totalPages: number
    currentPage: number
    booksPerPage: number
}

export default function BookList({ initialBooks, totalPages, currentPage }: BookListProps){
    const [books, setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getAllBooksAction()
            if(!data) return

            setBooks(data)
            setFilteredBooks(data)
        }

        fetchBooks()
    }, [])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)

        const filtered = books.filter(book => 
            book.title.toLowerCase().includes(value.toLowerCase()) || 
            book.author.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        setFilteredBooks(filtered)
    }

    return (
        <div className="flex flex-col h-full">
            <SearchBar onChange={handleSearch}/>

            {search.length > 0 ? (
                <GridBookCardHoverEffect books={filteredBooks}/>
            ) : (
                <>
                    <GridBookCardHoverEffect books={initialBooks}/>
                    <div className="flex justify-center mb-2 mt-auto">
                        <BookPagination currentPage={currentPage} totalPages={totalPages}/>
                    </div>
                </>
            )}
        </div>
    )
}