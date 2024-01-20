import { MenuItemProps } from "@/type/sidebarMenu"

import { BiBookContent as BookIcon, BiPencil as PencilIcon } from 'react-icons/bi';

const iconSize:number = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: 'Discover',
    href: '/discover',
    icon: <BookIcon size={iconSize} />,
    isShow: true,
  },
  {
    title: 'Pendataan Buku',
    href: '/buku',
    icon: <PencilIcon size={iconSize} />,
    isShow: true,
  },
]; 