import { CBACKEND_ENDPOINT } from "@/constant";
import { axiosGet, axiosPost } from "../axios";
import { IGetStakeHistory, IStakingModel, TCreatedStakingPayload, TGetActivitiesPayload, TGetStakeHistoryPayload } from "./staking.type";

export const stakeToken: (
    data: TCreatedStakingPayload
) => Promise<IStakingModel> = async (data) => {
    try {
        const result = await axiosPost([CBACKEND_ENDPOINT.staking.create, { data }])
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const getStakeHistory: (
    data: TGetStakeHistoryPayload
) => Promise<IGetStakeHistory> = async (data) => {
    try {
        const result = await axiosGet(`${CBACKEND_ENDPOINT.staking.history}?address=${data.address}&timeStamp=${data.timeStamp}`)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getUserActivities: (
    data: TGetActivitiesPayload
) => Promise<IGetStakeHistory> = async (data) => {
    try {
        const result = await axiosGet(`${CBACKEND_ENDPOINT.staking.userActivity}?address=${data.address}&offset=${data.offset}&limit=${data.limit}`)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}