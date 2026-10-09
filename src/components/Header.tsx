"use client";
import Image from "next/image";
import React from "react";
import { NavUserProfile } from "./NavUserProfile";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Image
            src="/bazar-hero.png"
            alt="Logo"
            loading="eager"
            priority
            width={100}
            height={100}
          />
          <div>
            <div>বাজার দর</div>
            <div>{date}</div>
          </div>
        </div>

        <div>
          <NavUserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
