import { getBookById } from "@/services/book"

const Page = async ({ params }: { params: { id: string } }) => {
    const data = await getBookById(params.id)
    return (
        <>
            {data.Judul}
        </>
    )
}

export default Page