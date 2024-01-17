import { MenuItemProps } from '@/type/sidebarMenu';

import MenuItem from './menuItems';

type MenuProps = {
  list: MenuItemProps[];
};

const Menu = ({list}:MenuProps) => {
    return (
        <div className='flex flex-col mx-2 gap-1'>
            {list?.map((item: MenuItemProps, index: number) => (
                <MenuItem key={index} {...item} />
            ))}
        </div>
    )
}

export default Menu