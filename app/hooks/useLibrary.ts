import { useContext } from "react"
import { LibraryContext } from "../contexts/LibraryContext"

export const useLibrary = () => {
    return useContext(LibraryContext)
}