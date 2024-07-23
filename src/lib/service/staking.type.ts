import { EFilterDate } from "@/constant";
import { ETXTYPE } from "@/constant/stake";
import { IBasicModel } from "@/types/model";

export interface IStakingModel extends IBasicModel {
    txAddress: string;
    txDate: Date;
    txAmount: number;
    txStatus: string;
    txHash: string;
    txType: ETXTYPE;
}

export type TCreatedStakingPayload = {
    address: string;
    amount: number;
    txHash: string;
    txDate: Date;
    txType: ETXTYPE;
}

export type TGetStakeHistoryPayload = {
    address: string;
    timeStamp: EFilterDate;
}

export interface IGetStakeHistory {
    xData: string[];
    yData: number[];
}