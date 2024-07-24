"use client";

import { KartCard } from "@/components/card";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import Chart from "react-apexcharts";
import {
  EFilterDate,
  chartData,
  kujirafinderTxHashUrl,
} from "../../constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useAppActions, useAppState } from "@/store/app.store";
import { toHuman } from "kujira.js";
import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { stakingApiService } from "@/lib/service";
import { useWallet } from "@/provider/crypto/wallet";
import { useNetwork } from "@/provider/crypto/network";
import useToast from "@/hooks/use-toast";
import { ETXTYPE } from "@/constant/stake";
import { addDaysToTimestamp, formatTimeStamp, formatTxHash } from "@/lib/utils";
import { IStakingModel } from "@/lib/service/staking.type";

export default function HomeSection() {
  const [chartTimeStep, setChartTimeStep] = useState(EFilterDate.week);
  const [chartXData, setChartXData] = useState<string[]>([]);
  const [chartYData, setChartYData] = useState<number[]>([]);

  const [activityCount, setActivityCount] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [activityList, setActivityList] = useState<Array<Partial<IStakingModel>>>([]);

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
        const usdYdata = resStakeHistory?.yData.map(item => Number((item * appState.kartPrice).toFixed(3)))
        setChartXData(resStakeHistory?.xData)
        setChartYData(usdYdata)
      }


    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserActivity = async () => {
    try {
      const res = await stakingApiService.getUserActivities({
        address: account?.address ?? "",
        offset: pageNum * 10,
        limit: 10
      })
      setActivityCount(res.count)
      setActivityList(res.items)
    } catch {
      toast.error("Network Error")
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchStakeHistory()
    }
  }, [chartTimeStep])

  useEffect(() => {
    if (account?.address) {
      fetchUserActivity()
    }
  }, [pageNum])


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
              <p className="pt-3 text-lg text-gray-300">~ USD</p>
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
                    <p className="pb-2 font-semibold text-gray-300">${(appState.rewards.kartReward * appState.kartPrice + appState.rewards.uskReward).toFixed(2)}</p>
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
                    <TableHead className="text-gray-300">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300 text-center">
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
                  {activityCount > 0 && activityList.map((item, index) => (
                    <TableRow key={index} className="text-white">
                      <TableCell className="text-[#90a4ae] text-sm whitespace-nowrap">{formatTimeStamp(item.txDate?.toString() ?? "-")}</TableCell>
                      <TableCell className="text-gray-300 text-sm">{item.txType ?? "-"}</TableCell>
                      <TableCell className="text-gray-300 text-sm">{item.amount ?? "-"}</TableCell>
                      <TableCell className="text-center text-gray-300">{item.txType === ETXTYPE.UNSTAKE && "10 Days"}</TableCell>
                      <TableCell className="text-left text-[#90a4ae] whitespace-nowrap">{item.txType === ETXTYPE.UNSTAKE && formatTimeStamp(addDaysToTimestamp(item.txDate?.toString() ?? "-", 10))}</TableCell>
                      <TableCell className="text-right text-green">
                        <div className="flex rounded-full items-center justify-center border border-[#00c853] bg-[#00c8531a] text-[#00c853] text-xs px-0.5 py-0.5">success</div>
                      </TableCell>
                      <TableCell className="flex text-left max-w-64 items-center h-full cursor-pointer">
                        <Link href={`${kujirafinderTxHashUrl + item.txHash}`} target="_blank" className="truncate text-sm">
                          {formatTxHash(item.txHash ?? '-')}
                        </Link>
                        <ExternalLinkIcon className="size-4 text-green ml-2" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {
                activityCount > 0 && (
                  <div className="w-full flex justify-end text-white mr-32">
                    <ReactPaginate
                      previousLabel="<<"
                      nextLabel=">>"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      pageCount={Math.ceil(activityCount / 10)}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={1}
                      onPageChange={(e) => setPageNum(e.selected)}
                      containerClassName="pagination"
                      activeClassName="active"
                    // forcePage={pageOffset}
                    />
                  </div>
                )
              }
            </KartCard>
          </div>
        </div>
      </main>
    </div>
  );
}
