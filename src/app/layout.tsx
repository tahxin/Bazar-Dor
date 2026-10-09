import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারের দাম এক নজরে। বাজারভিত্তিক বিস্তারিত দাম।",
  keywords: ["বাজার দর", "বাংলাদেশ", "নিত্যপণ্য", "বাজার দাম", "bazar dor"],
  openGraph: {
    title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    description: "নিত্যপণ্যের আজকের বাজার দাম এক নজরে।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${notoSerifBengali.className} bg-[#f5f5f0] min-h-screen`} suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "var(--font-noto-serif-bengali), serif",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
