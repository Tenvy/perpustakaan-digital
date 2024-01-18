import Sidebar from "@/components/sidebar/sidebar";
import Discover from "./components/discover";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar/>
      <Discover/>
    </main>
  )
}
