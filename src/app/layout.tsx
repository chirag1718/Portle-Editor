import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo Editor made by Chirag",
  description: "Created with ❤️ by Chirag Sonar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} h-screen bg-stone-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
