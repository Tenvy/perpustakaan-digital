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
    title: 'Peminjaman',
    href: '/pinjaman',
    icon: <PencilIcon size={iconSize} />,
    isShow: true,
  },
  { 
    title: 'Laporan',
    href: '/laporan',
    icon: <PencilIcon size={iconSize} />,
    isShow: true,
    user: ['admin', 'petugas']
  },
  { 
    title: 'Pendataan Buku',
    href: '/buku',
    icon: <PencilIcon size={iconSize} />,
    isShow: true,
    user: ['admin', 'petugas']
  },
  {
    title: 'Pendataan Kategori',
    href: '/kategori',
    icon: <PencilIcon size={iconSize} />,
    isShow: true,
    user: ['admin', 'petugas']
  },
]; 