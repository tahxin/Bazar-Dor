"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NavUserProfile } from "./NavUserProfile";
import NavLinks from "./NavLinks";
import Link from "next/link";

const Header = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/bazar-hero.png"
              alt="Logo"
              loading="eager"
              priority
              width={100}
              height={100}
            />
          </Link>

          <div>
            <Link href="/">বাজার দর</Link>
            <div>{date || "তারিখ লোড হচ্ছে..."}</div>
          </div>
        </div>

        <div>
          <NavUserProfile />
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
