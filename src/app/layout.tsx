"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Inter } from "next/font/google";
import AppLayouts from "@/components/layouts";
import { PasskeyContext } from "@/provider/crypto/passkey";
import { NetworkContext } from "@/provider/crypto/network";
import { WalletContext } from "@/provider/crypto/wallet";
import dynamic from "next/dynamic";
const AppProvider = dynamic(() => import("@/provider"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "KART Staking",
//   description: "KART Staking",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;family=Barlow+Semi+Condensed:wght@300;400;500&amp;display=swap"
          rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://srv.fontget.com/font/woff?font=33260" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>Kart Staking</title>
      </head>
      <body className={inter.className}>
        <AppProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            limit={1}
            rtl={false}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <PasskeyContext>
            <NetworkContext>
              <WalletContext>
                <AppLayouts>{children}</AppLayouts>
              </WalletContext>
            </NetworkContext>
          </PasskeyContext>
        </AppProvider>
      </body>
    </html>
  );
}
