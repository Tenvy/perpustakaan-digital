'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BsArrowRightShort as ExternalLinkIcon } from 'react-icons/bs';
import { MenuItemProps } from '@/type/sidebarMenu';

const MenuItem = ({
    title,
    href,
    icon,
    className = '',
    children,
    hideIcon = false,
}: MenuItemProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const isExternalUrl = href?.includes('http');
    const isHashLink = href === '#';
    
    const activeClasses = `flex font-sora items-center gap-5 py-2 px-4 text-primary-color hover:text-primary-color rounded-lg group ${pathname === href
            ? 'bg-primary-color !text-secondary-color'
            : 'hover:lg:bg-primary-color hover:!text-secondary-color hover:lg:bg-primary-color hover:lg:rounded-lg lg:transition-all lg:duration-300'
        }`;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const isActiveRoute = pathname === href;

    const itemComponent = () => {
        return (
            <div
                className={`
          ${activeClasses} 
          ${className}
          ${!hideIcon && `
            group-hover:-rotate-12 transition-all duration-300 
          `}
        `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {!hideIcon && (
                    <div
                        className={`${'group-hover:-rotate-12 transition-all duration-300' +
                            (isActiveRoute && '-rotate-12')
                            }`}
                    >
                        {icon}
                    </div>
                )}
                <div className='flex-grow ml-0.5'>{title}</div>
                {children && <>{children}</>}
                {isActiveRoute && (
                    <ExternalLinkIcon size={22} className='text-secondary-color animate-pulse' />
                )}
                {isExternalUrl && isHovered && (
                    <ExternalLinkIcon
                        size={22}
                        className='text-secondary-color -rotate-45 lg:transition-all lg:duration-300'
                    />
                )}
            </div>
        );
    };

    return isHashLink ? (
        <div className='cursor-pointer'>{itemComponent()}</div>
    ) : (
        <Link
            href={href}
            target={isExternalUrl ? '_blank' : ''}
        >
            {itemComponent()}
        </Link>
    );
};

export default MenuItem;