"use client";

import { useEffect, useState } from "react";

export default function HeaderDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="text-xs text-gray-400 font-medium leading-tight" suppressHydrationWarning>
      {date}
    </p>
  );
}
