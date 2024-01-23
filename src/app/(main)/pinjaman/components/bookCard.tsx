'use client'
import Card from "@/components/elements/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { kembalikanBuku } from "@/services/peminjaman"

const BookCard = ({
    BukuID,
    Gambar,
    Judul,
    Penulis,
    Penerbit,
    TahunTerbit,
    Deskripsi,
    PeminjamanID,
    TanggalPeminjaman,
    TanggalPengembalian
}: any) => {
    const router = useRouter()

    const deleteData = async (id: string): Promise<void> => {
        try {
            if(!id) return;

            await kembalikanBuku(id)
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh();
        }
    }

    return (
        <>
            <Card className="!bg-primary-color px-4 py-2 !text-secondary-color">
                <div className="flex gap-4">
                    <div className="min-w-[140px]">
                        <Image src={Gambar} alt="Book Image" width={140} height={240} className="border" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="text-2xl font-bold my-2">
                                {Judul}
                            </div>
                            <div className="mb-2">
                                <div>
                                    Penulis: {Penulis}
                                </div>
                                <div>
                                    Penerbit: {Penerbit}
                                </div>
                                <div>
                                    Tahun Terbit: {TahunTerbit}
                                </div>
                            </div>
                            <div>
                                {Deskripsi}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => deleteData(PeminjamanID)} className="bg-green-600 py-2 px-4 rounded-md">
                                Kembalikan
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default BookCard