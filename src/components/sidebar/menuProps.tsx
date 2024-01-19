import { MenuItemProps } from "@/type/sidebarMenu"

import { BiBookContent as BookIcon } from 'react-icons/bi';

const iconSize:number = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: 'Discover',
    href: '/discover',
    icon: <BookIcon size={iconSize} />,
    isShow: true,
  },
]; 