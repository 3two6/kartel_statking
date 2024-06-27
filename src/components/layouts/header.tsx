"use client";

import { NavItems } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ConnectWallet from "../connect-wallet";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className="z-20 flex items-center justify-between p-4 shadow-md sm:px-10">
            <div className="flex items-center gap-x-8 sm:gap-x-24">
                <Link href="/" className="flex flex-row items-center gap-5">
                    <Image alt="Kart Logo" width={136} height={30} className="h-6 w-fit sm:h-10" src="/images/logo.png" />
                    <span className="text-white text-3xl font-semibold">
                        Kart
                    </span>
                </Link>
                <div className="flex sm:space-x-4">
                    {
                        NavItems.map((item, index) => (
                            <Link key={index} href={item.href} className={`text-white text-base ${pathname === item.href ? "bg-purple" : ""} hidden rounded-sm py-2 sm:flex sm:px-4`}>
                                {item.label}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <ConnectWallet />
        </div>
    )
}