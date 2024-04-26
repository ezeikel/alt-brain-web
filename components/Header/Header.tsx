'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import cn from '@/utils/cn';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '../ui/button';

const NAVIGATION_ITEMS = [
  {
    id: '1',
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    id: '2',
    title: 'Add',
    href: '/add',
  },
  {
    id: '3',
    title: 'Billing',
    href: '/billing',
  },
];

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { status } = useSession();

  const renderAuthLink = () => {
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'authenticated') {
      return <Button onClick={() => signOut()}>Sign out</Button>;
    }

    return <Button onClick={() => signIn('google')}>Sign in</Button>;
  };
  return (
    <header
      className={cn('flex justify-between p-4 shadow-lg', {
        [className as string]: !!className,
      })}
    >
      <Link className="text-2xl font-bold font-serif" href="/">
        Alt Brain
      </Link>
      <div className="flex gap-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            {NAVIGATION_ITEMS.filter(() => {
              if (status !== 'authenticated') {
                return false;
              }

              return true;
            }).map((item) => (
              <Link href={item.href} key={item.id} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-x-4">{renderAuthLink()}</div>
      </div>
    </header>
  );
};

export default Header;
