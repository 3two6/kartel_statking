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
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://srv.fontget.com/font/woff?font=33260"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>KART STAKING</title>
        <meta name="description"
          content="The Kartel Project bringing GameFi to Kujira" />

        <meta property="og:url" content="https://kartel-staking.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kart Staking" />
        <meta property="og:description"
          content="The Kartel Project bringing GameFi to Kujira" />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="kartel-staking.vercel.app" />
        <meta property="twitter:url" content="https://kartel-staking.vercel.app" />
        <meta name="twitter:title" content="Kart Staking" />
        <meta name="twitter:description"
          content="The Kartel Project bringing GameFi to Kujira" />
        <meta name="twitter:image" content="" />
        <meta property="telegram:image" content="" />

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
