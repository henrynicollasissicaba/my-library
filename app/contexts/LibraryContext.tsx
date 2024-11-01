"use client"

import { createContext, useEffect, useState } from "react";
import { confirmAlert, successAlert } from "../utils/sweetAlerts.js";

type BookProps = {
  id: number;
  name: string;
  author: string;
  numberOfPages: number;
  gender: string;
  status: string;
};

type LibraryContextProps = {
  books: BookProps[]
  addBook: (book: BookProps) => void
  removeBook: (id: number) => void
  markAsRead: (id: number) => void
  readBooks: BookProps[]
  unreadBooks: BookProps[]
  orderedBooks: BookProps[]
};

export const LibraryContext = createContext<LibraryContextProps>({} as LibraryContextProps);

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
  let message, btnText, confirmTitle, confirmText = ""

  const [books, setBooks] = useState<BookProps[]>([]);

  const readBooks = books.filter((book) => book.status === "Lido")
  const unreadBooks = books.filter((book) => book.status === "Não lido")
  const orderedBooks = [...books].sort((a, b) => {
    if(a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) return -1
    if(a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) return 1
    return 0
  })

  useEffect(() => {
    const storedBooks = localStorage.getItem("library");
    if(storedBooks){
      setBooks(JSON.parse(storedBooks))
    }
  }, [])

  const addBook = (book: BookProps) => {
    setBooks((currentState) => {
      let maxId = 0
      currentState.forEach((book) => {
        if(book.id > maxId){
          maxId = book.id
        }
      })

      const newBook: BookProps = {
        ...book,
        id: maxId + 1
      }

      const updatedBooks = [...currentState, newBook];
      localStorage.setItem("library", JSON.stringify(updatedBooks));
      return updatedBooks;
    });

    successAlert()
  };

  const removeBook = async (id: number) => {
    message = "Tem certeza que deseja excluir esse livro?"
    btnText = "Excluir"
    confirmTitle = "Deletado"
    confirmText = "Seu livro foi excluído com sucesso!"

    const handleConfirm = await confirmAlert(message, btnText, confirmTitle, confirmText)

    if(handleConfirm){
      setBooks((currentState) => {
        const filteredBooks = currentState.filter((book) => book.id !== id);
  
        const reorderedBooks = filteredBooks.map((book, index) => ({
          ...book, 
          id: index + 1
        }))
        
        localStorage.setItem("library", JSON.stringify(reorderedBooks));
        return reorderedBooks
      });
    }
  };

  const markAsRead = async (id: number) => {
    message = "Tem certeza que deseja marcar esse livro como lido?"
    btnText = "Marcar como lido"
    confirmTitle = "Lido"
    confirmText = "Seu livro foi marcado como lido com sucesso!"

    const handleConfirm = await confirmAlert(message, btnText, confirmTitle, confirmText)

    if(handleConfirm){
      setBooks((currentState) => {
        const book = currentState.map(book => book.id === id ? {
          ...book,
          status: "Lido"
        }: book)
  
        localStorage.setItem("library", JSON.stringify(book));
        return book
      })
    }
  }

  const book = {
    books,
    addBook,
    removeBook,
    markAsRead,
    readBooks,
    unreadBooks,
    orderedBooks
  }

  return (
    <LibraryContext.Provider value={ book }>
      {children}
    </LibraryContext.Provider>
  );
};
