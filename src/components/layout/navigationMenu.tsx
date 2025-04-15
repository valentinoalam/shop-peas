import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ShareButton from '../buttons/shareButton';
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
    return (
        <Link
        href={href} onClick={onClick}
        className={cn("transition-colors duration-200 text-foreground/70 hover:text-foreground", className)}
        >
        {children}
        </Link>
    );
};

export interface NavItem {
    type?: string;
    label: string;
    description?: string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    href?: string;
    children?: Array<{
        label: string;
        href: string;
        description?: string;
    }>;
    onClick?: () => void;
}

interface NavigationMenuProps {
    items: NavItem[];
    className?: string;
}

const NavigationMenuComponent: React.FC<NavigationMenuProps> = ({ items, className }) => {
  const renderNavItem = (item: NavItem) => {
    if (item.type === 'dropdown') {
      return (
        <NavigationMenuItem key={item.label}>
          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <NavigationMenuLink asChild>
                    <NavLink href={child.href} className='bg-transparent'>{child.label}</NavLink>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    if (item.type === 'button') {
      return (
        <NavigationMenuItem key={item.label}><ShareButton label={item.label} /></NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.href}>
        <Link href={item.href as string} className='bg-none' legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle({ transparent: true })}>
            {item.label}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  return (
      <NavigationMenu className={className}>
        <NavigationMenuList>
          {items.map(renderNavItem)}
        </NavigationMenuList>
      </NavigationMenu>
  );
};

export default NavigationMenuComponent;