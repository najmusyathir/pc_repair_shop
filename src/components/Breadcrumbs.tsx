"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  
  const pathname = usePathname() ?? '/';
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm my-4">
      <ul className="flex space-x-2 text-gray-500">
        <li>
          <Link href="/dashboard" className="hover:underline text-blue-600">
            ~
          </Link>
          {segments.length > 0 && <span className="mx-2">/</span>}
        </li>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          if (seg == "internal") return
          return (
            <li key={i} className="flex items-center space-x-2">
              {!isLast ? (
                <>
                  <Link
                    href={href}
                    className="hover:underline text-blue-600 capitalize">
                    {seg}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="text-gray-800 font-medium capitalize">
                  {seg}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
