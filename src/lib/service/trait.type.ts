import { EFilterDate } from "@/constant";
import { ETXTYPE } from "@/constant/stake";
import { IBasicModel } from "@/types/model";

export interface ITraitModel extends IBasicModel {
    key: string;
    name: string;
    value: string;
}

export interface ITraitValue {
    value: string;
}