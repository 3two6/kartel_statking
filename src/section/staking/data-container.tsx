import { KartCard } from "@/components/card";
import { useAppState } from "@/store/app.store";

export default function DataContainer() {


    const appState = useAppState()

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <KartCard>
                <h3 className="font-normal text-gray-300">Fully Diluted Value</h3>
                <div className="text-gray-300 text-2xl">${new Intl.NumberFormat().format(appState.kartPrice * 100000000)}</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Total Supply</h3>
                <div className="text-gray-300 text-2xl">100,000,000</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Staking APR</h3>
                <div className="text-gray-300 text-2xl">12.64 %</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">KART Price</h3>
                <div className="text-gray-300 text-2xl">{appState.kartPrice} USD</div>
            </KartCard>
            <KartCard>
                <h3 className="font-normal text-gray-300">Total Staked</h3>
                <div className="text-gray-300 text-2xl">{appState.totalStaked} KART</div>
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