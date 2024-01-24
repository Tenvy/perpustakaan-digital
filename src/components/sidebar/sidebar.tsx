import Breakline from "../elements/breakline"
import Logo from "./logo";
import Menu from "./menu"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { MENU_ITEMS } from './menuProps'
import LogOut from "./signout";

const Sidebar = async () => {
    const session:any = await getServerSession(authOptions)
    const filteredMenu = MENU_ITEMS?.filter((item) => {
        const userAllowed = item.user ? item.user.includes(session?.user?.Role) : true;
        return item?.isShow && userAllowed;
      });
    return (
        <header className="w-[35vh] bg-secondary-color">
                <div className="sticky h-[100vh] transition-all duration-300 top-0 z-10 flex flex-col lg:py-8">
                    <Logo/>
                    <Breakline/>
                    <Menu list={filteredMenu}/>
                    <Breakline/>
                    <LogOut/>
                </div>
        </header>
    )
}

export default Sidebar