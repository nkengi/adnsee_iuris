"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';


  const AccountType = "perso";
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: 'Home', href: '/dashboard', icon: "/svg/dashboard-3.svg" },
    {
      name: 'Process',
      href: '/process',
      icon: "/svg/flowchart-hierarchy-process-2.svg",
    },
    { name: 'Settings', href: `/settings`, icon: "/svg/settings-gear.svg" },
  ];
  
  export default function NavLinks() {
    const pathname = usePathname();
  
    return (
      <>
        {links.map((link) => {
          const isActive = pathname === link.href;
  
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': isActive,
                  'bg-gray-50 text-gray-900': !isActive,
                }
              )}
            >
              {/* Render SVG Icon */}
              {link.icon && (
                <Image
                  src={link.icon}
                  alt={`${link.name} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }