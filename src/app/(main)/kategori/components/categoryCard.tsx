import { kategoriType } from "@/type/kategori"

const CategoryCard = ({
    KategoriID,
    NamaKategori
}: kategoriType) => {
    return (
        <div className="bg-green-500 py-2 px-4 text-secondary-color rounded-md cursor-pointer hover:bg-green-600">
            {NamaKategori}
        </div>
    )
}

export default CategoryCard