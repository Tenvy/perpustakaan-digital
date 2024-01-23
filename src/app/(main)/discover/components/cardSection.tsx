import Card from "@/components/elements/card"
import Image from "next/image"
import { getBook } from "@/services/book"
import { bukuType } from "@/type/buku"
import Link from "next/link"

const CardSection = async () => {
    const data = await getBook()

    return (
        <div className="grid grid-cols-6 gap-4">
            {data?.map((res: bukuType, key: number) => {
                return (
                    <Link href={`/discover/${res.BukuID}`} key={key}>
                        <Card className="flex h-full">
                            <div className="mx-auto p-2 flex flex-col gap-2">
                                <Image src={res.Gambar} alt="Gambar-Buku" width={200} height={300} className="border" />
                                <div className="text-primary-color">
                                    <div className="text-lg font-bold">
                                        {res.Judul}
                                    </div>
                                    <div className="">
                                        {res.Penulis}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}

export default CardSection