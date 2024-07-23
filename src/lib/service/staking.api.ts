import { CBACKEND_ENDPOINT } from "@/constant";
import { axiosPost } from "../axios";
import { IStakingModel, TCreatedStakingPayload } from "./staking.type";

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