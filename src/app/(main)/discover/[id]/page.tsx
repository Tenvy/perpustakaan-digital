import { getBookById } from "@/services/book"

const Page = async ({ params }: { params: { id: string } }) => {
    const data = await getBookById(params.id)
    
    return (
        <div className="bg-secondary-color rounded-xl text-primary-color">
            {data.Judul}
        </div>
    )
}

export default Page