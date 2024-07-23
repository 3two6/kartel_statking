import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { KujiraQueryClient } from "kujira.js";

export type TSignAndBroadcastFn = (
  msgs: EncodeObject[],
  memo?: string,
) => Promise<DeliverTxResponse>;

export type Schedule = {
  start: string,
  end: string,
  amount: string,
  release: string
}

export type TAppState = {
  kujiBalance: number;
  kartBalance: number;
  uskBalance: number;
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
    addReward: (
      amount: number,
      denom: string,
      schedule: Schedule,
      sender: string,
      fn: TSignAndBroadcastFn,
      query: KujiraQueryClient) => Promise<void>;
    setLoading: (status: boolean) => void;
  };
};
