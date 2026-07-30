"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "home", href: "/" },
  { label: "music", href: "/music" },
  { label: "shop", href: "/shop" },
  { label: "blog", href: "/blog" },
  { label: "biography", href: "/biography" }
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="top-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "active" : ""}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
