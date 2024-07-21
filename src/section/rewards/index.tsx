"use client";

import { KartCard } from "@/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { Input } from "@/components/ui/input";
import { token } from "../../constant";
import useToast from "@/hooks/use-toast";
import { useAppState } from "@/store/app.store";
import { BigNumber } from "ethers";
import { toHuman } from "kujira.js";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function RewardsSection() {
  const appState = useAppState();
  const toast = useToast();
  const [selectedToken, setSelectedToken] = useState(token[0]);

  const kartBalance = toHuman(BigNumber.from(appState.kartBalance), 6).toFixed(
    2,
  );

  const handleRewards = async () => {
    console.log("handle rewards");
  };
  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-5 sm:px-6 sm:pt-0 lg:px-8 sm:mt-24">
      <KartCard className="my-10 flex w-full max-w-lg flex-col items-start gap-y-8 p-8 drop-shadow-16 sm:mb-0">
        <h1 className="text-gray-300 font-semibold text-xl">Add Rewards</h1>
        <p className="text-gray-300">
          Choose the token and amount you want to deposit as a reward.
        </p>
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col w-full gap-2">
            <span className="text-xs font-light text-gray-300">Available</span>
            <span className="text-xs text-gray-300">{kartBalance} KART</span>
          </div>
          <div className="w-full text-lg">
            <div className="mt-2 flex items-center rounded-sm bg-transparent px-4 py-2 shadow-sm border border-purple-border">
              <div className="relative flex grow items-stretch">
                <span className="absolute top-0 left-0 flex h-full items-center justify-center text-gray500">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex cursor-pointer items-center gap-2 uppercase">
                        <Image
                          width="20"
                          height="20"
                          src={selectedToken.src}
                          className="h-5 w-5"
                          alt="token"
                        />
                        <span className="text-base">{selectedToken.name}</span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-12 border-purple-0.5 bg-[#0D0B32CC]">
                      <DropdownMenuRadioGroup
                        value={selectedToken.name}
                        onValueChange={(value) => {
                          const newToken = token.find((t) => t.name === value);
                          if (newToken) {
                            setSelectedToken(newToken);
                          }
                        }}
                      >
                        {token.map((t, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={t.name}
                            className="gap-5 uppercase text-white hover:bg-transparent"
                          >
                            <img src={t.src} className="h-4 w-4" />
                            {t.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
                <Input
                  type="number"
                  className="block w-full bg-transparent py-2 pl-20 outline-none placeholder:text-lg placeholder:text-primary/50 sm:text-lg sm:leading-6"
                />
              </div>
              <button
                type="button"
                className="relative text-gray-300 inline-flex items-center gap-x-1.5 rounded bg-purple px-2 py-1.5 text-sm shadow-md"
              >
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 text-xs">
          <p className="text-gray-300 text-base">
            Select the distribution period for the tokens in months.
          </p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="border-purple-0.5 bg-[#0D0B32CC]">
              <SelectGroup>
                {Array.from({ length: 36 }, (_, i) => (
                  <SelectItem
                    key={i + 1}
                    className="text-gray-300"
                    value={`${i + 1}`}
                  >
                    {i + 1} month{i + 1 > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <button
          className={`bg-purple border border-none w-full rounded py-3 text-gray-300 transition-all duration-100 ease-in-out`}
          onClick={handleRewards}
        >
          Add Rewards
        </button>
      </KartCard>
    </div>
  );
}
