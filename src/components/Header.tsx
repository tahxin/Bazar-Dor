import Image from "next/image";
import React from "react";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div>
      <Image
        src="/bazar-hero.png"
        alt="Logo"
        loading="eager"
        priority
        width={100}
        height={100}
      />
      <div>বাজার দর</div>
      <div>{date}</div>
      <div>Profile</div>
    </div>
  );
};

export default Header;
