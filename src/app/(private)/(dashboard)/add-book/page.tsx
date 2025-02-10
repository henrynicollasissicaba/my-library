import CreateBookForm from "@/app/components/pages/CreateBookForm";
import Heading from "@/app/components/ui/Heading";

export default function AddBookPage(){
    return(
        <main>
            <Heading title="Cadastrar" highlightWord="livro"/>
            <CreateBookForm />
        </main>
    )
}