import { getBookById } from "@/services/book"
import DetailSection from "./components/detailSection"
import PinjamSection from "./components/pinjamSection"

const Page = async ({ params }: { params: { id: string } }) => {
    const data = await getBookById(params.id)

    return (
        <div className="flex gap-4">
            <div className="bg-secondary-color rounded-xl text-primary-color w-full">
                <DetailSection {...data}/>
            </div>
            <div className="w-[30%]">
                <PinjamSection {...data}/>
            </div>
        </div>
    )
}

export default Page