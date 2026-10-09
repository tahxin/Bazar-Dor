"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export function NavUserProfile() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        id="nav-user-avatar"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Image
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
          alt="Jane Doe"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <Image
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              alt="Jane Doe"
              width={32}
              height={32}
              className="rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate">jane@example.com</p>
            </div>
          </div>

          <ul className="py-1">
            <li>
              <button
                id="nav-profile-btn"
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                id="nav-logout-btn"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
                onClick={() => setOpen(false)}
              >
                <span>Log Out</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
