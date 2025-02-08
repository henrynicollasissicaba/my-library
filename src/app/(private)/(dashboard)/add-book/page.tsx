import CreateBookForm from "@/app/components/forms/CreateBookForm";
import Heading from "@/app/components/Heading";

export default function AddBookPage(){
    return(
        <main>
            <Heading title="Cadastrar" highlightWord="livro"/>
            <CreateBookForm />
        </main>
    )
}