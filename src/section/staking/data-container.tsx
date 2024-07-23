import { KartCard } from "@/components/card";

export default function DataContainer() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <KartCard>
                <h3 className="font-normal text-gray-300">Market Cap</h3>
                <div className="text-gray-300 text-2xl">$4,807,737</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Total Supply</h3>
                <div className="text-gray-300 text-2xl">100,000,000</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Staking APR</h3>
                <div className="text-gray-300 text-2xl">12.6 %</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">KART Price</h3>
                <div className="text-gray-300 text-2xl">0.032 USDC</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Total KART Staked</h3>
                <div className="text-gray-300 text-2xl">0.032 USDC</div>
            </KartCard>
            {/* <KartCard className="gap-3">
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
            </KartCard> */}
        </div>
    )
}