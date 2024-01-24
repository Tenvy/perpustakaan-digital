'use client'
import Card from "@/components/elements/card"
import { deleteBook } from "@/services/book"
import { bukuType } from "@/type/buku"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEdgeStore } from "@/provider/AuthProvider"
import cover from "@/../public/coverDefault.png"

const BookCard = ({
    BukuID,
    Gambar,
    Judul,
    Penulis,
    Penerbit,
    TahunTerbit,
    Deskripsi
}: bukuType) => {
    const router = useRouter()
    const { edgestore } = useEdgeStore()

    const deleteData = async (id : number): Promise<void> => {
        try {
            if(!id) return;
            if(Gambar){
                await edgestore.publicImages.delete({
                    url: Gambar
                });
            }

            await deleteBook(id)
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
                    {Gambar ? (
                        <Image src={Gambar} alt={Judul} width={140} height={240} className="border" />
                        ):(
                        <Image src={cover} alt={Judul} width={140} height={240} className="border"/>
                    )}
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
                        <div className="py-2">
                            <button onClick={() => deleteData(BukuID)} className="bg-red-600 py-2 px-4 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default BookCard