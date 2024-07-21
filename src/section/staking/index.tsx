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

export default function StakingSection() {

  const [selectedOption, setSelectedOption] = useState<string>(
    StakingOptions[0].value,
  );

  const [{ query }] = useNetwork()

  const { account, signAndBroadcast } = useWallet()

  const appState = useAppState()
  const { bond, unbond } = useAppActions()

  const toast = useToast();

  const kartBalance = toHuman(
    BigNumber.from(appState.kartBalance), 6
  ).toFixed(2)


  const handleStake = async () => {
    if (!account) {
      // toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      // toast.error("Network Error");
      return;
    }

    try {
      await bond(100, account.address, signAndBroadcast, query)
      // toast.success("Stake KART success");
    } catch (err) {
      // toast.error("User rejected transaction");
    }
  }


  const handleUnstake = async () => {
    if (!account) {
      // toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      // toast.error("Network Error");
      return;
    }

    try {
      await unbond(10, account.address, signAndBroadcast, query)
      // toast.success("Stake KART success");
    } catch (err) {
      // toast.error("User rejected transaction");
    }
  }



  return (
    <div className="relative z-10 flex w-full flex-col items-center px-4 py-5 sm:px-6 sm:pt-0 lg:px-8">
      <main className="mx-auto hidden w-full max-w-7xl flex-col sm:mt-24 sm:flex">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <KartCard>
            <h3 className="font-normal text-gray-300">Market Cap</h3>
            <div className="text-gray-300">$4,807,737</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">Circulating Supply</h3>
            <div className="text-gray-300">151,606,080 KART</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">Staking APR</h3>
            <div className="text-gray-300">28.48%</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">KART Price</h3>
            <div className="text-gray-300">0.032 USDC</div>
          </KartCard>
          <KartCard className="gap-3">
            <div className="flex w-full flex-col items-center gap-y-2 sm:items-start">
              <h3 className="font-normal text-gray-300">Staking Ratio</h3>
              <div className="text-gray-300">13.07%</div>
              <div className="text-sm font-light text-gray-300">
                19,822,172.065 staked
              </div>
            </div>
            <button className="w-full bg-purple px-2 py-2 text-white text-xs rounded-lg">
              Staked / Circulating
            </button>
          </KartCard>
        </div>
      </main>
      <KartCard className="my-10 flex w-full max-w-lg flex-col items-start gap-y-8 p-8 drop-shadow-16 sm:mb-0">
        <h1 className="text-gray-300 font-normal">KART Staking</h1>
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
            <span className="text-xs font-light text-gray-300">Available</span>
            <span className="text-xs text-gray-300">{kartBalance} KART</span>
          </div>
          <div className="w-full text-lg">
            <div className="mt-2 flex items-center rounded-sm bg-transparent px-4 py-2 shadow-sm border border-purple-border">
              <div className="relative flex grow items-stretch">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <Image
                    alt="Kart Logo black"
                    width={20}
                    height={20}
                    src="/images/logo.png"
                  />
                </div>
                <Input className="block w-full bg-transparent py-2 pl-11 outline-none placeholder:text-lg placeholder:text-primary/50 sm:text-lg sm:leading-6" />
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
        <div className="flex w-full flex-col gap-y-3 text-xs">
          <div className="flex min-h-4 justify-between">
            {selectedOption === StakingOptions[1].value && (
              <>
                <div className="text-gray-300">Unstaking Period</div>
                <div className="text-purple">14 Days</div>
              </>
            )}
          </div>
        </div>
        <button
          className={`bg-purple border w-full rounded py-3 text-gray-300 transition-all duration-100 ease-in-out ${selectedOption === StakingOptions[0].value ? "bg-purple border-transparent" : "bg-transparent border-purple-border"}`}
          onClick={selectedOption === StakingOptions[0].value ? handleStake : handleUnstake}
        >
          {selectedOption === StakingOptions[0].value ? "Stake" : "Unstake"}
        </button>
      </KartCard>
      <main className="mx-auto flex w-full max-w-7xl flex-col sm:mt-32 sm:hidden">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <KartCard>
            <h3 className="font-normal text-gray-300">Market Cap</h3>
            <div className="text-gray-300">$4,807,737</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">Circulating Supply</h3>
            <div className="text-gray-300">151,606,080 KART</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">Staking APR</h3>
            <div className="text-gray-300">28.48%</div>
          </KartCard>
          <KartCard>
            <h3 className="font-normal text-gray-300">KART Price</h3>
            <div className="text-gray-300">0.032 USDC</div>
          </KartCard>
          <KartCard className="gap-3">
            <div className="flex w-full flex-col items-center gap-y-2 sm:items-start">
              <h3 className="font-normal text-gray-300">Staking Ratio</h3>
              <div className="text-gray-300">13.07%</div>
              <div className="text-sm font-light text-gray-300">
                19,822,172.065 staked
              </div>
            </div>
            <button className="w-full bg-purple px-2 py-2 text-white text-xs rounded-lg">
              Staked / Circulating
            </button>
          </KartCard>
        </div>
      </main>
    </div>
  );
}
