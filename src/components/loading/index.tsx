import { useAppState } from "@/store/app.store"
import Spinner from "./spinner"

function Loading() {
    const appState = useAppState()
    if (appState.loading)
        return (
            <div className='flex absolute w-full h-full justify-center items-center backdrop-blur-sm bg-[#0000004D] z-30'>
                <Spinner />
            </div>
        )
    else return null
}

export default Loading
