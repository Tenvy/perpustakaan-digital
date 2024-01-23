import { getBook } from "@/services/book"
import BookCard from "./bookCard"
import { bukuType } from "@/type/buku"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getPeminjamanByUserId } from "@/services/peminjaman"
import { peminjamanType } from "@/type/peminjaman"

const BookDataSection = async () => {
    const data: bukuType[] = await getBook()
    const session:any = await getServerSession(authOptions)
    const getDataPinjam: peminjamanType[] = await getPeminjamanByUserId(session?.user?.UserID)
    return (
        <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">
                Buku yang Dipinjam
            </div>
            {getDataPinjam.filter(item => item.StatusPinjaman === 'dipinjam').map(item => {
                const matchingUser:any = data.find(book => book.BukuID === item.BukuID);

                const bookCardProps = {
                    ...matchingUser,
                    PeminjamanID: item.PeminjamanID,
                    TanggalPeminjaman: item.TanggalPeminjaman,
                    TanggalPengembalian: item.TanggalPengembalian
                };
                                
                return (
                    <BookCard {...bookCardProps} key={item.PeminjamanID}/>
                )
            })}
        </div>
    )
}

export default BookDataSection