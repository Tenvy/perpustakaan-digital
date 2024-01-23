import Breakline from "@/components/elements/breakline"
import { getCategoryServer } from "@/services/kategori"
import { bukuType } from "@/type/buku"
import { kategoriType } from "@/type/kategori"
import Image from "next/image"

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

    return (
        <div className="p-4">
            <div className="flex text-primary-color">
                <div>
                    <Image src={Gambar} alt="Book-Image" width={200} height={300} />
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
                            {kategoribuku_relasi?.length !== 0 ? category
                                .filter(item1 => kategoribuku_relasi?.some(item2 => item2.KategoriID === item1.KategoriID))
                                .map(item => (
                                    <div key={item.KategoriID} className="bg-green-500 py-2 px-4 text-secondary-color rounded-md cursor-default">
                                        {item.NamaKategori}
                                    </div>
                                )) : 'Tidak ada kategori'}
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSection