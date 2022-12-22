'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './navbar.css';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Schema', href: '/schema', prefetch: false },
  { text: 'Demo', href: '/demo', prefetch: false },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="nav nav-masthead justify-content-center float-md-end">
      {navItems.map(
        (
          item: { text: string; href: string; prefetch?: boolean },
          idx: number,
        ) => (
          <Link
            key={idx}
            href={item.href}
            className={`nav-link${item.href === pathname ? ' active' : ''}`}
            prefetch={item.prefetch}
          >
            {item.text}
          </Link>
        ),
      )}
    </nav>
  );
};

export default Navbar;
