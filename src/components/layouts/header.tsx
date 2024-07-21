"use client";

import { NavItems } from "../../constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ConnectWallet from "../connect-wallet";
import { useWallet } from "@/provider/crypto/wallet";
import WalletBtnDropdown from "../wallet-btn-dropdown";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

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
                        className="w-fit h-10"
                        src="/images/logo.png"
                        priority
                    />
                    <span className="sm:flex hidden text-white text-2xl font-semibold">
                        KART Staking
                    </span>
                </Link>
                <div className="flex gap-5 sm:space-x-4">
                    {NavItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`sm:flex hidden uppercase text-base font-medium rounded-sm py-2 sm:px-4 ${pathname === item.href ? "text-purple font-semibold" : "text-white"}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex sm:hidden bg-transparent hover:bg-transparent border border-transparent hover:border-purple-border py-1 px-2">
                                    <Menu className="text-gray-300" />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="border-none bg-[#0D0B32CC]">
                                    <ul className="flex bg-transparent">
                                        {
                                            NavItems.map((item, index) => (
                                                <li className="" key={index}>
                                                    <NavigationMenuLink asChild className="bg-transparent">
                                                        <Link
                                                            className="flex h-full bg-transparent text-gray-300 hover:text-purple w-full select-none flex-col justify-end rounded-md p-3"
                                                            href={item.href}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

            </div>
            {account?.address ? <WalletBtnDropdown /> : <ConnectWallet />}
        </div>
    );
}
