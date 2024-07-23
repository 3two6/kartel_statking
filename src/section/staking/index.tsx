"use client";

import { KartCard } from "@/components/card";
import { Input } from "@/components/ui/input";
import { StakingOptions } from "../../constant";
import { useAppActions, useAppState } from "@/store/app.store";
import { toHuman } from "kujira.js";
import Image from "next/image";
import { useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { useNetwork } from "@/provider/crypto/network";
import { useWallet } from "@/provider/crypto/wallet";
import useToast from "@/hooks/use-toast";
import DataContainer from "./data-container";

export default function StakingSection() {
  const [selectedOption, setSelectedOption] = useState<string>(
    StakingOptions[0].value,
  );
  const [amount, setAmount] = useState("0");

  const [{ query }] = useNetwork();

  const { account, signAndBroadcast } = useWallet();

  const appState = useAppState();
  const { bond, unbond, getUserInfo } = useAppActions();

  const toast = useToast();

  const kartBalance = toHuman(BigNumber.from(appState.kartBalance), 6).toFixed(2);
  const stakedKartBalance = toHuman(BigNumber.from(appState.stakedAmt), 6).toFixed(2);
  const avaliableBalance = selectedOption === StakingOptions[1].value ? stakedKartBalance : kartBalance

  const handleStake = async () => {
    if (!account) {
      toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      toast.error("Network Error");
      return;
    }

    if ((parseFloat(amount) <= 0)) {
      toast.error("Invalid amount");
      return;
    }

    if ((parseFloat(amount) > parseFloat(avaliableBalance))) {
      toast.error("Insufficient balance to stake");
      return;
    }
    try {
      await bond(parseFloat(amount), account.address, signAndBroadcast, query);
      toast.success("Stake KART success");
    } catch (err) {
      toast.error("User rejected transaction");
    }
  };

  const handleUnstake = async () => {
    if (!account) {
      toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      toast.error("Network Error");
      return;
    }

    if ((parseFloat(amount) <= 0)) {
      toast.error("Invalid amount");
      return;
    }

    if ((parseFloat(amount) > parseFloat(avaliableBalance))) {
      toast.error("Insufficient balance to unstake");
      return;
    }

    try {
      await unbond(parseFloat(amount), account.address, signAndBroadcast, query);
      toast.success("Unstake KART success");
    } catch (err) {
      toast.error("User rejected transaction");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const reqTest = new RegExp(`^\\d*\\.?\\d{0,2}$`);
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


  return (
    <div className="relative z-10 flex w-full flex-col items-center px-4 py-5 sm:px-6 sm:pt-0 lg:px-8">
      <main className="relative mx-auto hidden w-full max-w-7xl flex-col sm:mt-24 sm:flex">
        <DataContainer />
      </main>
      <KartCard className="my-10 flex w-full max-w-lg flex-col items-start gap-y-8 p-8 drop-shadow-16 sm:mb-0">
        <h1 className="text-gray-300 font-normal">KART STAKING</h1>
        <div className="flex w-full space-x-2 rounded-sm bg-transparent p-2 transition-all duration-200 ease-in-out">
          {StakingOptions.map((item, index) => (
            <button
              key={index}
              className={`w-full rounded-sm py-2 border transition-all duration-200 ease-in-out bg-purple text-gray-300 ${selectedOption === item.value ? "bg-purple border-transparent" : "bg-transparent border-purple-border"}`}
              onClick={() => setSelectedOption(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center gap-x-2">
            <span className="text-sm font-light text-gray-300">Available : </span>
            <span className="text-sm text-gray-300">{avaliableBalance} KART</span>
          </div>
          <div className="w-full text-lg">
            <div className="mt-2 flex items-center rounded-sm bg-transparent px-4 py-2 shadow-sm border border-purple-border">
              <div className="relative flex grow items-stretch">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2">
                  <Image
                    alt="Kart Logo black"
                    width={20}
                    height={20}
                    src="/images/logo.png"
                  />
                  <span className="text-gray-300 uppercase text-base">
                    kart
                  </span>
                </div>
                <Input
                  type="number"
                  className="block w-full bg-transparent py-2 pl-20 outline-none placeholder:text-lg placeholder:text-primary/50 sm:text-lg sm:leading-6"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <button
                type="button"
                className="relative text-gray-300 inline-flex items-center gap-x-1.5 rounded bg-purple px-2 py-1.5 text-sm shadow-md"
                onClick={() => setAmount(avaliableBalance)}
              >
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-1 text-xs">
          <div className="flex min-h-3 justify-between">
            {selectedOption === StakingOptions[1].value && (
              <>
                <div className="text-gray-300 text-sm">Unstaking Period</div>
                <div className="text-white text-sm">10 Days</div>
              </>
            )}
          </div>
        </div>
        <button
          className={`flex flex-row gap-4 justify-center bg-purple border w-full rounded py-3 text-gray-300 transition-all duration-100 ease-in-out ${selectedOption === StakingOptions[0].value ? "bg-purple border-transparent" : "bg-transparent border-purple-border"}`}
          onClick={
            selectedOption === StakingOptions[0].value
              ? handleStake
              : handleUnstake
          }
        >
          {selectedOption === StakingOptions[0].value ? "Stake" : "Unstake"}
        </button>
      </KartCard>
      <main className="mx-auto flex w-full max-w-7xl flex-col sm:mt-32 sm:hidden">
        <DataContainer />
      </main>
    </div>
  );
}
