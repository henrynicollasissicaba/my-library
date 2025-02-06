export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }){
    const bookId = +(await params).bookId

    return(
        <h1>Book id: {bookId}</h1>
    )
}