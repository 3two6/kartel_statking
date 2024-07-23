"use client";

import { KartCard } from "@/components/card";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import Chart from "react-apexcharts";
import {
  EFilterDate,
  chartData,
} from "../../constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppActions, useAppState } from "@/store/app.store";
import { toHuman } from "kujira.js";
import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { stakingApiService } from "@/lib/service";
import { useWallet } from "@/provider/crypto/wallet";
import { useNetwork } from "@/provider/crypto/network";
import useToast from "@/hooks/use-toast";
import { ETXTYPE } from "@/constant/stake";
import { addDaysToTimestamp } from "@/lib/utils";

export default function HomeSection() {
  const [chartTimeStep, setChartTimeStep] = useState(EFilterDate.week);
  const [chartXData, setChartXData] = useState<string[]>([]);
  const [chartYData, setChartYData] = useState<number[]>([]);

  const appState = useAppState();
  const stakedAmt = toHuman(BigNumber.from(appState.stakedAmt), 6).toFixed(3);

  const { account, signAndBroadcast } = useWallet()

  const { withdraw } = useAppActions()

  const [{ query }] = useNetwork()
  const toast = useToast()

  const fetchStakeHistory = async () => {
    try {
      const resStakeHistory = await stakingApiService.getStakeHistory({
        address: account?.address ?? "",
        timeStamp: chartTimeStep
      })

      if (resStakeHistory?.xData && resStakeHistory?.yData && resStakeHistory?.xData.length === resStakeHistory?.yData.length) {
        setChartXData(resStakeHistory?.xData)
        setChartYData(resStakeHistory?.yData)
      }


    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchStakeHistory()
    }
  }, [chartTimeStep])

  const kartBalance = toHuman(BigNumber.from(appState.kartBalance), 6).toFixed(3);

  const handleWithdraw = async () => {
    if (!account) {
      toast.error("Connect your wallet");
      return;
    }

    if (!query) {
      toast.error("Network Error");
      return;
    }

    try {
      await withdraw(account.address, signAndBroadcast, query);
      toast.success("Claim reward success")
    } catch (err) {
      toast.error("User reject transaction")
    }
  }


  return (
    <div className="relative z-10 flex w-full flex-col items-center pb-10">
      <main className="mt-10 w-full max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="flex flex-col gap-y-5 lg:col-span-1">
            <KartCard>
              <h1 className="font-light text-gray-300">Rewards earned daily</h1>
              <p className="pt-3 text-lg text-gray-300">{0} USD</p>
            </KartCard>
            <KartCard>
              <h1 className="font-light text-gray-300">KART Price</h1>
              <p className="pt-3 text-lg text-gray-300">{appState.kartPrice} USDC</p>
            </KartCard>
          </div>
          <div className="lg:col-span-2">
            <KartCard>
              <h1 className="pb-10 text-2xl font-normal text-gray-300">
                Your Positions
              </h1>
              <div className="flex flex-col w-full items-center justify-between rounded-lg border border-purple-border px-6 py-3 gap-3">
                <div className="flex flex-row items-center justify-between w-full gap-5">
                  <div className="hidden items-center gap-x-3 sm:flex">
                    <Image
                      alt="kart Logo inverted"
                      width={32}
                      height={32}
                      src="/images/logo.png"
                    />
                    <p className="font-bold text-gray-300">KART</p>
                  </div>
                  <Link
                    href="/staking"
                    className="rounded-lg bg-purple px-7 py-1 text-white"
                  >
                    Stake
                  </Link>
                </div>
                <div className="flex flex-row justify-around w-full">
                  <div className="flex flex-col items-center">
                    <p className="text-gray-300 font-light">Staking APR</p>
                    <p className="text-sm font-semibold text-gray-300">
                      12.64 %
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-300 font-light">Wallet Balance</p>
                    <p className="text-sm font-semibold text-gray-300">
                      {kartBalance}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-full sm:mt-5 gap-2">
                <div className="flex w-1/2 flex-col items-center justify-between rounded-lg border border-purple-border p-5">
                  <div className="flex flex-col items-center">
                    <h2 className="pb-6 text-gray-300">Staked</h2>
                    <p className="pb-2 font-semibold text-lg text-gray-300">
                      {stakedAmt} KART
                    </p>
                  </div>
                  <Link
                    href="/staking"
                    className="mt-6 w-full bg-purple p-2 text-white text-center rounded-lg"
                  >
                    Unstake
                  </Link>
                </div>
                <div className="flex w-1/2 flex-col items-center justify-between rounded-lg border border-purple-border p-5 gap-3">
                  <h2 className=" text-gray-300">My Rewards</h2>
                  <div className="flex flex-col items-center">
                    <p className="pb-2 font-semibold text-gray-300">$0</p>
                    <div className="flex flex-row gap-3">
                      <p className="text-gray-300 text-xs">{appState.rewards.kartReward} <span className="text-xs">KART,</span></p>
                      <p className="text-gray-300 text-xs">{appState.rewards.uskReward} <span className="text-xs">USK</span></p>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full bg-purple p-2 text-white rounded-lg"
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </KartCard>
          </div>
          <div className="lg:col-span-2 ">
            <KartCard>
              <div className="flex w-full items-center justify-between px-4">
                <div className="flex flex-col">
                  <h2 className="text-base text-gray-300">Your Portfolio</h2>
                </div>
                <div className="grid w-36 grid-cols-3 rounded-lg border border-purple-border bg-transparent p-2 transition-all duration-150 ease-in-out lg:w-6/12">
                  {Object.values(EFilterDate).map((item, index) => (
                    <button
                      key={index}
                      className={`rounded-lg text-sm p-1 ${chartTimeStep === item ? "bg-purple text-white shadow" : "text-gray-300"}`}
                      onClick={() => setChartTimeStep(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex size-full items-center justify-center h-full">
                <div className="w-full">
                  <Chart
                    options={{ ...chartData.options, xaxis: { ...chartData.options.xaxis, categories: chartXData } }}
                    series={[{ ...chartData.series[0], data: chartYData }]}
                    type="line"
                    width="100%"
                    height="auto"
                  />
                </div>
              </div>
            </KartCard>
          </div>
          <div className="lg:col-span-5">
            <KartCard>
              <h2 className="mb-2 w-full text-lg font-normal text-gray-300">
                My activity
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="whitespace-nowrap">
                    <TableHead className="w-[100px] text-gray-300">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">
                      Unstaking Period
                    </TableHead>
                    <TableHead className="text-gray-300">
                      Release Date
                    </TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-left text-gray-300">
                      Finder
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appState.activity.length > 0 && appState.activity.map((item, index) => (
                    <TableRow key={index} className="text-white">
                      <TableCell className="text-gray-400 text-sm">{item.txDate?.toString() ?? "-"}</TableCell>
                      <TableCell className="text-gray-400 text-sm">{item.txType ?? "-"}</TableCell>
                      <TableCell className="text-gray-400 text-sm">{item.amount ?? "-"}</TableCell>
                      <TableCell className="text-center">{item.txType === ETXTYPE.UNSTAKE && "14 Days"}</TableCell>
                      <TableCell className="text-left">{item.txType === ETXTYPE.UNSTAKE && addDaysToTimestamp(item.txDate?.toString() ?? "-", 14)}</TableCell>
                      <TableCell className="text-right text-green">success</TableCell>
                      <TableCell className="flex text-left max-w-56 items-center h-full">
                        <Link href={`https://finder.kujira.network/harpoon-4/tx/${item.txHash}`} target="_blank" className="truncate text-sm">
                          {item.txHash ?? '-'}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </KartCard>
          </div>
        </div>
      </main>
    </div>
  );
}
