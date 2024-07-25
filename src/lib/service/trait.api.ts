import { CBACKEND_ENDPOINT } from "@/constant";
import { axiosGet } from "../axios";
import { ITotalRewardRes, ITraitValue } from "./trait.type";

export const getKartCurrency: () => Promise<ITraitValue> = async () => {
    try {
        const result = await axiosGet(CBACKEND_ENDPOINT.trait.kartCurrency)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const getTotalStakeAmount: () => Promise<ITraitValue> = async () => {
    try {
        const result = await axiosGet(CBACKEND_ENDPOINT.trait.totalStake)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getTotalRewardAmount: () => Promise<ITotalRewardRes> = async () => {
    try {
        const result = await axiosGet(CBACKEND_ENDPOINT.trait.totalReward)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}