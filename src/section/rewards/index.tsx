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
import { useAppActions, useAppState } from "@/store/app.store";
import { BigNumber } from "ethers";
import { fromHumanString, toHuman } from "kujira.js";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useWallet } from "@/provider/crypto/wallet";
import { useNetwork } from "@/provider/crypto/network";
import { KART_DENOM, USK_DENOM } from "@/constant/token";

export default function RewardsSection() {


  const appState = useAppState();
  const toast = useToast();
  const [selectedToken, setSelectedToken] = useState(token[0]);
  const [month, setMonth] = useState<number>(0);
  const [amount, setAmount] = useState("0");

  const { addReward } = useAppActions()

  const { account, signAndBroadcast } = useWallet()
  const [{ query }] = useNetwork()

  const kartBalance = ((Math.floor(toHuman(BigNumber.from(appState.kartBalance), 6)) * 1000) / 1000).toString()
  const uskBalance = ((Math.floor(toHuman(BigNumber.from(appState.uskBalance), 6)) * 1000) / 1000).toString()

  const handleRewards = async () => {
    if (!account) {
      toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      toast.error("Network Error");
      return;
    }

    if (Number(amount) === 0) {
      toast.error("Input valid amount");
      return;
    }

    if (month === 0) {
      toast.error("Please select the period");
      return;
    }

    if (selectedToken.denom === USK_DENOM && (parseFloat(amount) > parseFloat(uskBalance))) {
      toast.error("Insufficient balance to reward");
      return;
    }

    if (selectedToken.denom === KART_DENOM && (parseFloat(amount) > parseFloat(kartBalance))) {
      toast.error("Insufficient balance to reward");
      return;
    }

    try {
      const startDate = new Date()
      const endDate = addMonthsToDate(startDate, month)
      await addReward(
        Number(amount),
        selectedToken.denom,
        { start: (startDate.getTime() * 1000000).toString(), end: (endDate.getTime() * 1000000).toString(), amount: fromHumanString(amount, 6).toString(), release: "fixed" },
        account.address,
        signAndBroadcast,
        query
      );
      toast.success("Add Reward success");
    } catch (err) {
      toast.error("User rejected transaction");
    }

  };

  const handleSetDuration = (value: string) => {
    setMonth(Number(value));
  }

  function addMonthsToDate(startDate: Date, months: number) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date;  // Convert back to ISO string format
  }


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const reqTest = new RegExp(`^\\d*\\.?\\d{0,3}$`);
    if (reqTest.test(inputValue) && inputValue !== "") {
      const updateValue =
        parseFloat(inputValue) >= 1
          ? inputValue.replace(/^0+/, "")
          : inputValue;
      setAmount(updateValue);
    } else if (inputValue === "") {
      setAmount("0");
    }
  };


  const handleSetMaxAmount = () => {
    if (selectedToken.denom === USK_DENOM) {
      setAmount(uskBalance)
    } else if (selectedToken.denom === KART_DENOM) {
      setAmount(kartBalance)
    }
  }

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-5 sm:px-6 sm:pt-0 lg:px-8 sm:mt-24">
      <KartCard className="my-10 flex w-full max-w-lg flex-col items-start gap-y-8 p-8 drop-shadow-16 sm:mb-0">
        <h1 className="text-gray-300 font-semibold text-xl">Add Rewards</h1>
        <p className="text-gray-300">
          Choose the token and amount you want to deposit as a reward.
        </p>
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-row w-full gap-2">
            <span className="text-xs font-light text-gray-300">Available : </span>
            <span className="text-xs text-gray-300">{selectedToken.denom === USK_DENOM ? uskBalance : kartBalance} <span className="text-gray-300 uppercase">{selectedToken.name}</span></span>
          </div>
          <div className="w-full text-lg">
            <div className="mt-2 flex items-center rounded-sm bg-transparent px-4 py-2 shadow-sm border border-purple-border">
              <div className="relative flex grow items-stretch">
                <span className="absolute top-0 left-0 flex h-full items-center justify-center text-gray500">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="text-gray-300">
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
                  value={amount}
                  onChange={handleAmountChange}
                  className="block w-full bg-transparent text-gray-300 py-2 pl-20 outline-none placeholder:text-lg placeholder:text-primary/50 sm:text-lg sm:leading-6"
                />
              </div>
              <button
                type="button"
                className="relative text-gray-300 inline-flex items-center gap-x-1.5 rounded bg-purple px-2 py-1.5 text-sm shadow-md"
                onClick={handleSetMaxAmount}
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
          <Select onValueChange={handleSetDuration} >
            <SelectTrigger className="w-full ">
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
