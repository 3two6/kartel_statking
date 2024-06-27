import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import AppLayouts from "@/components/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kart Staking",
  description: "Kart Staking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppLayouts>
            {children}
          </AppLayouts>
        </Providers>
      </body>
    </html>
  );
}
