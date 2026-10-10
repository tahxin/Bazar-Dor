"use client";

import { useEffect, useState } from "react";

export default function BannerDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#047F39] bg-[#e0f2e9] px-3 py-1 rounded-full mb-4"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>📅</span>
      <span suppressHydrationWarning>{date || "আজকের তারিখ"}</span>
    </span>
  );
}
