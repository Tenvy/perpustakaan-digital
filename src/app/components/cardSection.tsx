import Card from "@/components/elements/card"
import Image from "next/image"
import { getBook } from "@/services/book"
import { bukuType } from "@/type/buku"

const CardSection = async () => {
    const data = await getBook()
    console.log(data)
    return (
        <div className="grid grid-cols-6 gap-2">
            {data?.map((res: bukuType, key: number) => {
                return (
                    <Card key={key} className="flex">
                        <div className=" mx-auto p-2 flex flex-col gap-2">
                            <Image src={res.Gambar} alt="Gambar-Buku" width={200} height={600} className="border" />
                            <div className="">
                                <div className="text-lg font-bold">
                                    {res.Judul}
                                </div>
                                <div className="">
                                    {res.Penulis}
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default CardSection