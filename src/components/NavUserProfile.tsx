"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export function NavUserProfile() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন।");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 text-sm font-semibold bg-[#047F39] text-white rounded-xl hover:bg-[#036B30] transition-colors shadow-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="relative" ref={ref}>
      <button
        id="nav-user-avatar"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#047F39]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#047F39] text-white flex items-center justify-center text-sm font-bold">
            {initials}
          </div>
        )}
        <span className="text-sm font-semibold text-gray-800 hidden sm:block">
          {user.name ?? "ব্যবহারকারী"}
        </span>
        <svg className="w-3 h-3 text-gray-400 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User"}
                width={32}
                height={32}
                className="rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#047F39] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <ul className="py-1">
            <li>
              <Link
                id="nav-profile-btn"
                href="/profile"
                onClick={() => setOpen(false)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                আমার প্রোফাইল
              </Link>
            </li>
            <li>
              <button
                id="nav-logout-btn"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
                onClick={handleSignOut}
              >
                <span>সাইন আউট</span>
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
