import { useAppState } from "@/store/app.store"
import Spinner from "./spinner"
import Image from "next/image"

function Loading() {
    const appState = useAppState()
    if (appState.loading)
        return (
            <div className='flex absolute w-full h-full justify-center items-center backdrop-blur-sm bg-[#0000004D] z-30'>
                <Spinner />
                <Image
                    src="/images/logo.png"
                    width={100}
                    height={100}
                    className="absolute w-10 h-10"
                    alt="loading"
                />
            </div>
        )
    else return null
}

export default Loading
