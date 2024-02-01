import Breakline from "@/components/elements/breakline"
import { getCategoryServer } from "@/services/kategori"
import { bukuType } from "@/type/buku"
import { kategoriType } from "@/type/kategori"
import Image from "next/image"
import cover from "@/../public/coverDefault.png"

const DetailSection = async ({
    BukuID,
    Judul,
    Deskripsi,
    Gambar,
    Penerbit,
    Penulis,
    TahunTerbit,
    kategoribuku_relasi
}: bukuType) => {
    const category: kategoriType[] = await getCategoryServer()
    console.log(kategoribuku_relasi)
    return (
        <div className="p-4">
            <div className="flex text-primary-color">
                <div>
                {Gambar ? (
                                    <Image src={Gambar} alt={Judul} width={200} height={300} className="border" />
                                ):(
                                    <Image src={cover} alt={Judul} width={200} height={300} className="border"/>
                                )}
                </div>
                <div className="w-full">
                    <div className="px-4">
                        <div className="text-lg">
                            {Penulis}
                        </div>
                        <div className="text-3xl font-bold">
                            {Judul}
                        </div>
                    </div>
                    <Breakline />
                    <div className="px-4 min-h-[200px]">
                        <div className="font-semibold">
                            Deskripsi Buku
                        </div>
                        <div className="">
                            {Deskripsi}
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="font-semibold py-2">
                            Detail
                        </div>
                        <li className="flex gap-4 text-sm">
                            <div>
                                <div>Tahun Terbit</div>
                                <div>{TahunTerbit}</div>
                            </div>
                            <div>
                                <div>Penerbit</div>
                                <div>{Penerbit}</div>
                            </div>
                        </li>
                    </div>
                    <div className="px-4">
                        <div className="font-semibold py-2">
                            Kategori
                        </div>
                        <li className="flex gap-4 flex-wrap">
                            {kategoribuku_relasi?.map(res => {
                                return (
                                    <div key={res.kategoribuku_relasi?.KategoriID} className="bg-green-500 py-2 px-4 text-secondary-color rounded-md cursor-default">
                                        {res.kategoribuku.NamaKategori}
                                    </div>
                                )
                            })}
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSection