import { Book } from "@/models/Book";
import BookTitleItem from "../sections/BookTitleItem";
import BookAuthorItem from "../sections/BookAuthorItem";
import BookStatusItem from "../sections/BookStatusItem";
import BookNumberOfPagesIem from "../sections/BookNumberOfPagesItem";
import BookCategoryItem from "../sections/BookCategoryItem";
import BookDialogComponent from "../sections/BookDialogComponent";

interface BookItemProps {
    book: Book
}

export default function BookCardItem({ book } : BookItemProps) {
  return (
    <>
      <div className="relative flex justify-between">
        <BookTitleItem title={book.title}/>
        <BookDialogComponent bookId={book.id} bookStatus={book.status}/>
      </div>
      <BookAuthorItem author={book.author}/>
      <hr className="opacity-30" />
      <div className="flex items-center justify-between mt-4">
        <BookStatusItem status={book.status}/>
        <BookNumberOfPagesIem number_of_pages={book.number_of_pages}/>
      </div>
      <BookCategoryItem category={book.category}/>
    </>
  );
}
