import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";

const inter = Tiro_Bangla({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাঙলা কোরআন অডিও",
  description: "শুধুমাত্র বাঙলা অডিও কোরআন শোনার জন্য", 
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200, 
        height: 630, 
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
