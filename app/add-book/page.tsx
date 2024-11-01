"use client"

import Heading from "../components/Heading"
import Button from "../components/Button"
import { ChangeEvent, FormEvent, useState, useContext } from "react"
import { LibraryContext } from "../contexts/LibraryContext"

const inputClassName = "p-2 w-full md:w-64 rounded-md outline-none shadow-lg"
const selectClassName = "w-[51rem] p-2 outline-none rounded-md shadow-lg cursor-pointer"
const divInputsClassName = "w-full md:w-64 flex flex-col gap-2"
const labelClassName = "font-bold text-[#ecebeb] cursor-pointer"

const CATEGORIES = [
  "Administração e Economia", "Autoajuda", "Educação e Didáticos", "Fantasia e Horror",
  "HQs e Mangás", "Infantil", "Literatura e Ficção", "Romance", "Saúde e Medicina",
  "Política e Filosofia"
]

const STATUS = [
  "Lido", "Não lido"
]

const Page = () => {
  const initialValue = {
    name: "",
    author: "",
    numberOfPages: 0,
    category: "",
    status: "",
    id: 0
  }

  const [book, setBook] = useState(initialValue)
  const { addBook } = useContext(LibraryContext)

  const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBook((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value 
      }
    })
  }

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    addBook(book)
    setBook(initialValue)
  }

  return (
    <form className="w-full pb-5" onSubmit={handleSubmit}>
      <Heading>Adicionar Livro</Heading>
      
      <div className="flex flex-wrap gap-6">
        <div className={divInputsClassName}>
          <label htmlFor="name" className={labelClassName}>Nome do livro</label>
          <input
          type="text"
          name="name"
          id="name"
          placeholder="Insira o nome do livro"
          className={inputClassName}
          value={book.name}
          onChange={handleChange}
          autoComplete="off"
        />
        </div>
        <div className={divInputsClassName}>
          <label htmlFor="author" className={labelClassName}>Nome do autor</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Insira o nome do autor"
            className={inputClassName}
            value={book.author}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={divInputsClassName}>
          <label htmlFor="numberOfPages" className={labelClassName}>Número de páginas</label>
          <input
            type="text"
            name="numberOfPages"
            id="numberOfPages"
            placeholder="Insira o número de páginas"
            className={inputClassName}
            value={book.numberOfPages}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <select name="category" id="category" className={selectClassName} value={book.category}
        onChange={handleChange} required>
          <option value="" disabled hidden>Selecione a categoria do livro</option>
          {CATEGORIES.map((category) => (
            <option
            key={category} 
            value={category}
            defaultChecked={book.category === category}>
              {category}
            </option>
          ))}
        </select>

        <select name="status" id="status" className={`${selectClassName} mb-10`} value={book.status}
        onChange={handleChange} required>
          <option value="" disabled hidden>Selecione o status do livro</option>
            {STATUS.map((status) => (
              <option
              key={status}
              value={status}
              defaultChecked={book.status === status}>
                {status}
              </option>  
            ))}
        </select>
      </div>

      <Button label="Adicionar livro"
              className="bg-blue-300 text-blue-900 transition-colors hover:bg-blue-500
              hover:text-white"
      />
    </form>
  )
}

export default Page