import { ReactNode } from 'react';

export type MenuItemProps = {
  title: string;
  href: string;
  icon: JSX.Element;
  isShow?: boolean;
  user?: string[];
  className?: string;
  children?: ReactNode;
  hideIcon?: boolean;
};