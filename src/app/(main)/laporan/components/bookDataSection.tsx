import { getBook } from "@/services/book"
import BookCard from "./bookCard"
import { bukuType } from "@/type/buku"
import { getPeminjaman } from "@/services/peminjaman"
import { peminjamanType } from "@/type/peminjaman"

const BookDataSection = async () => {
    const data: bukuType[] = await getBook()
    const getDataPinjam: peminjamanType[] = await getPeminjaman()
    console.log(getDataPinjam)
    return (
        <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">
                Laporan Buku yang dipinjam
            </div>
            {getDataPinjam.map(item => {
                const matchingUser:any = data.find(book => book.BukuID === item.BukuID);

                const bookCardProps = {
                    ...matchingUser,
                    UserID: item.UserID,
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