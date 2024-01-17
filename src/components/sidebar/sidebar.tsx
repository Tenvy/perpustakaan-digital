import Breakline from "../elements/breakline"
import Logo from "./logo";
import Menu from "./menu"

import { MENU_ITEMS } from './menuProps'

const Sidebar = async () => {
    const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);


    return (
        <header className="w-[35vh] bg-secondary-color">
                <div className="sticky h-[100vh] transition-all duration-300 top-0 z-10 flex flex-col lg:py-8">
                    <Logo/>
                    <Breakline/>
                    <Menu list={filteredMenu}/>
                    <Breakline/>
                </div>
        </header>
    )
}

export default Sidebar