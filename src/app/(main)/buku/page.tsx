import BookDataSection from "./components/bookDataSection"
import CreateSection from "./components/CreateSection"

const Page = () => {
    return (
        <div className="bg-secondary-color rounded-xl p-4 text-primary-color">
            <CreateSection/>
            <BookDataSection/>
        </div>
    )
}

export default Page