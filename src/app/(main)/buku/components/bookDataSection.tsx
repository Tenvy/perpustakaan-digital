import { getBook } from "@/services/book"
import BookCard from "./bookCard"
import { bukuType } from "@/type/buku"

const BookDataSection = async () => {
    const data = await getBook()
    return (
        <div className="flex flex-col gap-2">
            {data.map((buku: bukuType, key: number) => (
                <BookCard {...buku} key={key}/>
            ))}
        </div>
    )
}

export default BookDataSection