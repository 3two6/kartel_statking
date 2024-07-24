"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ChevronRight, Download } from "lucide-react";
import LoadingIcon from "./loading-icon";
import { Adapter, useWallet } from "@/provider/crypto/wallet";
import Image from "next/image";

interface ITokenList {
  name: string;
  image: string;
}

const tokenList: ITokenList[] = [
  {
    name: "Keplr",
    image: "/images/tokens/keplr.svg",
  },
  {
    name: "Leap",
    image: "/images/tokens/leap.svg",
  },
  {
    name: "Cosmostation",
    image: "/images/tokens/cosmostation.svg",
  },
];

const CWalletLink = {
  keplr: "https://www.keplr.app/download",
  cosmostation: "https://www.cosmostation.io/products/cosmostation_extension",
  leap: "https://www.leapwallet.io",
};

const defaultLoading = {
  keplr: false,
  cosmostation: false,
  leap: false,
};

export default function ConnectWallet() {
  const [loading, setLoading] = useState(defaultLoading);
  const { connect } = useWallet();

  const handleConnectWalet = async (walletType: string) => {
    try {
      switch (walletType) {
        case "Keplr":
          if (!window.keplr) {
            window.open(CWalletLink.keplr, "_blank");
            return;
          }
          setLoading((prev) => ({ ...prev, keplr: true }));
          await connect(Adapter.Keplr);
          break;
        case "Leap":
          if (!window.leap) {
            window.open(CWalletLink.leap, "_blank");
            return;
          }
          setLoading((prev) => ({ ...prev, leap: true }));
          await connect(Adapter.Leap);
          break;
        case "Cosmostation":
          if (!window.station) {
            window.open(CWalletLink.cosmostation, "_blank");
            return;
          }
          setLoading((prev) => ({ ...prev, cosmostation: true }));
          await connect(Adapter.Station);
          break;
        default:
          break;
      }
      setLoading(defaultLoading);
    } catch (error) {
      alert(
        "No RPC connections available for testnet. Please check your internet connection.",
      );
      setLoading(defaultLoading);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative rounded-lg px-4 py-2 text-sm text-white bg-purple outline-none">
          Connect Wallet
        </button>
      </DialogTrigger>
      <DialogContent className="gap-10 rounded-lg border-2 border-gray-900 bg-[#0D0B32] p-10 sm:max-w-sm">
        <DialogHeader className="flex flex-row text-center">
          <DialogTitle className="text-center text-2xl text-white">
            Wallet Connect
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {tokenList.map((item, index) => (
            <button
              onClick={() => handleConnectWalet(item.name)}
              className="flex flex-row items-center justify-between gap-2 rounded-lg p-2"
              key={index}
            >
              <div className="flex flex-row items-center gap-5">
                <Image
                  src={item.image}
                  className="h-8 w-8"
                  alt={item.name}
                  width={32}
                  height={32}
                />
                <span className="text-start text-lg text-white">
                  {item.name}
                </span>
              </div>
              {item.name === "Keplr" &&
                !loading.keplr &&
                (window.keplr ? (
                  <ChevronRight className="h-5 w-5 text-white" />
                ) : (
                  <Download className="h-5 w-5 text-white" />
                ))}
              {item.name === "Leap" &&
                !loading.leap &&
                (window.leap ? (
                  <ChevronRight className="h-5 w-5 text-white" />
                ) : (
                  <Download className="h-5 w-5 text-white" />
                ))}
              {item.name === "Cosmostation" &&
                !loading.cosmostation &&
                (window.station ? (
                  <ChevronRight className="h-5 w-5 text-white" />
                ) : (
                  <Download className="h-5 w-5 text-white" />
                ))}
              {item.name === "Keplr" && loading.keplr && <LoadingIcon />}
              {item.name === "Leap" && loading.leap && <LoadingIcon />}
              {item.name === "Cosmostation" && loading.cosmostation && (
                <LoadingIcon />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
