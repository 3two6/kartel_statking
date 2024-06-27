"use client";

import { NavItems } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ConnectWallet from "../connect-wallet";
import { useWallet } from "@/provider/crypto/wallet";
import WalletBtnDropdown from "../wallet-btn-dropdown";

export default function Header() {
  const pathname = usePathname();
  const { account } = useWallet();
  return (
    <div className="z-20 flex items-center justify-between p-4 sm:px-10 border-b drop-shadow-sm border text-card-foreground border-purple-0.15">
      <div className="flex items-center gap-x-8 sm:gap-x-24">
        <Link href="/" className="flex flex-row items-center gap-5">
          <Image
            alt="Kart Logo"
            width={136}
            height={30}
            className="h-6 w-fit sm:h-10"
            src="/images/logo.png"
            priority
          />
          <span className="text-white text-2xl font-semibold">
            Kart Staking
          </span>
        </Link>
        <div className="flex sm:space-x-4">
          {NavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`uppercase text-base ${pathname === item.href ? "text-purple" : "text-white"} hidden rounded-sm py-2 sm:flex sm:px-4`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/staking"
            className={`text-base sm:hidden flex rounded-sm py-2 px-4 ${pathname === "/staking" ? "text-purple" : "text-white"}`}
          >
            Stake
          </Link>
        </div>
      </div>
      {account?.address ? <WalletBtnDropdown /> : <ConnectWallet />}
    </div>
  );
}
