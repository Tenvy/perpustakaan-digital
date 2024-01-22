import { getCategoryServer } from "@/services/kategori"
import CategoryCard from "./categoryCard"
import { kategoriType } from "@/type/kategori";

const CategorySection = async () => {
    const data = await getCategoryServer();

    return (
        <div>
            <div className="text-xl font-bold my-2">
                Category List
            </div>
            <div className="border flex flex-wrap gap-2 p-2">
                {data.map((data: kategoriType, key: number) => (
                    <CategoryCard {...data} key={key}/>
                ))}
            </div>
        </div>
    )
}

export default CategorySection