import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoamNest - By Feel",
  description: "RoamNest is a small version of Airbnb with given data",
  authors: [
    {
      name: "Felix Chinonso Emmanuel",
      url: "https://github.com/feelchi1star",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
