"use client";

import { useWallet } from "@/provider/crypto/wallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/drop-down";
import {
  ChevronDown,
  Clipboard,
  CreditCard,
  Keyboard,
  Settings,
  User,
} from "lucide-react";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletBtnDropdown() {
  const { disconnect, account } = useWallet();

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-row items-center gap-2 relative rounded-lg px-4 py-2 text-sm text-white bg-purple outline-none">
          {truncateAddress(account?.address ?? "")}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-dark border border-purple-0.15">
        <DropdownMenuLabel className="text-gray-300 text-lg">
          {truncateAddress(account?.address ?? "")}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex flex-row items-center p-2 cursor-pointer text-gray-300"
            onClick={handleCopyAddress}
          >
            <Clipboard className="mr-2 h-4 w-4" />
            <span>Copy Address</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row items-center p-2 cursor-pointer text-gray-300"
            onClick={handleDisconnect}
          >
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
