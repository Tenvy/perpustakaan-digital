import { CreateCategory } from "./components/CreateSection"
import CategorySection from "./components/categorySection"

const Page = () => {
    return (
        <div className="bg-secondary-color rounded-xl p-4 text-primary-color">
            <CreateCategory/>
            <CategorySection/>
        </div>
    )
}

export default Page