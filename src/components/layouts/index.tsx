"use client";

import Footer from "./footer";
import Header from "./header";
import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import dynamic from "next/dynamic";
import { PasskeyContext } from "@/provider/crypto/passkey";
import { NetworkContext } from "@/provider/crypto/network";
import { WalletContext } from "@/provider/crypto/wallet";
const AppProvider = dynamic(() => import("@/provider"), { ssr: false });

export default function AppLayouts({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <PasskeyContext>
        <NetworkContext>
          <WalletContext>
            <div className="h-screen flex flex-col bg-opacity-90 bg-gradient-to-b from-dark to-dark bg-blend-multiply">
              <Header />
              <div className="relative w-full grow overflow-y-auto">
                <ScrollArea className="w-full h-full">{children}</ScrollArea>
              </div>
              <Footer />
            </div>
          </WalletContext>
        </NetworkContext>
      </PasskeyContext>
    </AppProvider>
  );
}
