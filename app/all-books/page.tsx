"use client"
import Heading from '../components/Heading'
import BookCard from '../components/BookCard'
import { useLibrary } from '../hooks/useLibrary'
import { useState } from 'react'
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const Page = () => {
  const { books, orderedBooks } = useLibrary()
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(ev.target.checked)
  }

  return (
    <section className="pb-5">
        <div className="flex flex-col">
          <Heading>Livros cadastrados</Heading>
          <div className="flex mb-8 items-center">
            <Checkbox id="order-books" checked={isChecked} onChange={handleCheckbox} color='default'/>
            <label htmlFor="order-books"
            className="text-lg cursor-pointer text-[#ecebeb] font-medium"
            >
              Colocar em ordem alfabética
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {isChecked ? 
            orderedBooks.map(({ name, author, numberOfPages, gender, status, id }) => (
              <BookCard
                name={name}
                author={author}
                numberOfPages={numberOfPages}
                gender={gender}
                status={status}
                id={id}
                key={id}
              />
            )) : 
            books.map(({ name, author, numberOfPages, gender, status, id }) => (
              <BookCard 
                name={name}
                author={author}
                numberOfPages={numberOfPages}
                gender={gender}
                status={status}
                id={id}
                key={id}
              />
            ))
          }
        </div>
    </section>
  )
}

export default Page