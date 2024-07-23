import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { KujiraQueryClient } from "kujira.js";

export type TSignAndBroadcastFn = (
  msgs: EncodeObject[],
  memo?: string,
) => Promise<DeliverTxResponse>;

export type TAppState = {
  kujiBalance: number;
  kartBalance: number;
  kartPrice: number;
  stakedAmt: number;
  rewards: number;
  claims: Array<{ amount: string; release_at: number }>;
  loading: boolean;
};

export type TAppStore = {
  app: TAppState;
  actions: {
    getAppInfo: (query: KujiraQueryClient) => Promise<void>;
    initializeAppInfo: () => Promise<void>;
    getUserInfo: (owner: string, query: KujiraQueryClient) => Promise<void>;
    bond: (
      amount: number,
      sender: string,
      fn: TSignAndBroadcastFn,
      query: KujiraQueryClient,
    ) => Promise<void>;
    unbond: (
      amount: number,
      sender: string,
      fn: TSignAndBroadcastFn,
      query: KujiraQueryClient,
    ) => Promise<void>;
    claim: () => Promise<void>;
    unlock: () => Promise<void>;
    setLoading: (status: boolean) => void;
  };
};
