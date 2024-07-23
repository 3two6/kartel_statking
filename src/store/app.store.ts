import { KART_DENOM, REWARDS_ADDR, STAKING_ADDR, USK_DENOM } from "@/constant/token";
import { TAppState, TAppStore } from "./app.type";
import { fromHumanString, msg, toHuman } from "kujira.js";
import { create } from "zustand";

import { BigNumber } from "@ethersproject/bignumber";
import { coin } from "@cosmjs/proto-signing";
import { stakingApiService, traitApiService } from "@/lib/service";
import { ETXTYPE } from "@/constant/stake";

const initialState: TAppState = {
  kujiBalance: 0,
  kartBalance: 0,
  uskBalance: 0,
  kartPrice: 0,
  stakedAmt: 0,
  totalStaked: 0,
  rewards: { uskReward: 0, kartReward: 0 },
  claims: [],
  activity: [],
  loading: false,
};

const useAppStore = create<TAppStore>((set, get) => {
  return {
    app: initialState,
    actions: {
      async getAppInfo(query) {
        get().actions.setLoading(true);

        try {
          const resKartPrice = await traitApiService.getKartCurrency()
          const resTotalStake = await traitApiService.getTotalStakeAmount()

          set({
            app: {
              ...get().app,
              kartPrice: Number(resKartPrice.value ?? 0.046),
              totalStaked: Number(resTotalStake.value ?? 0),
            },
          });

        } catch (err) {
          console.log(err)
        } finally {
          get().actions.setLoading(true);

        }
      },

      async initializeAppInfo() {
        set({
          app: initialState,
        });
      },

      async getUserInfo(owner, query) {
        get().actions.setLoading(true);
        const resUserActivities = await stakingApiService.getUserActivities({
          address: owner,
          limit: 10,
          offset: 0
        })

        if (!owner) {
          set({
            app: initialState,
          });
          get().actions.setLoading(false);
          return;
        }

        try {
          let kujiBalance, kartBalance, uskBalance;

          await query.bank.allBalances(owner).then((x) => {
            x?.map((b) => {
              if (b.denom === "ukuji") kujiBalance = b.amount;
              if (b.denom === KART_DENOM) kartBalance = b.amount;
              if (b.denom === USK_DENOM) uskBalance = b.amount;
            });
          });

          const stakedAmt = await query.wasm.queryContractSmart(STAKING_ADDR, {
            staked: { address: owner },
          });

          const claims = await query.wasm
            .queryContractSmart(STAKING_ADDR, { claims: { address: owner } })
            .then((x: { claims: Array<any> }) => {
              if (x.claims.length > 0) {
                let claims: Array<{ amount: string, release_at: string }> = [];
                x.claims.map((claim) => {
                  claims.push({ amount: toHuman(BigNumber.from(claim.amount), 6).toString(), release_at: claim.release_at.at_time })
                })
                return claims
              } else {
                return []
              }
            });

          const rewards = await query.wasm.queryContractSmart(
            REWARDS_ADDR, { pending_rewards: { staker: owner } }
          ).then((x: { rewards: Array<{ denom: string, amount: string }> }) => {
            let kartReward = 0, uskReward = 0;
            if (x.rewards.length > 0) {
              x.rewards.map((reward) => {
                if (reward.denom === USK_DENOM)
                  uskReward = Number(toHuman(BigNumber.from(reward.amount), 6).toFixed(3))
                else if (reward.denom === KART_DENOM)
                  kartReward = Number(toHuman(BigNumber.from(reward.amount), 6).toFixed(3))
              })
            }
            return { kartReward, uskReward }
          })

          set({
            app: {
              ...get().app,
              kujiBalance: Number(toHuman(BigNumber.from(kujiBalance ?? 0), 6)),
              kartBalance: Number(kartBalance ?? 0),
              uskBalance: Number(uskBalance ?? 0),
              stakedAmt: stakedAmt?.stake ?? 0,
              rewards: rewards,
              activity: resUserActivities.items,
              claims,
            },
          });
        } catch (err) {
          console.error(err);
        } finally {
          get().actions.setLoading(false);
        }
      },

      async bond(amount, sender, sign, query) {
        get().actions.setLoading(true);

        try {
          const executeMsg = msg.wasm.msgExecuteContract({
            contract: STAKING_ADDR,
            sender: sender,
            msg: Buffer.from(JSON.stringify({ bond: {} })),
            funds: [
              coin(fromHumanString(String(amount), 6).toNumber(), KART_DENOM),
            ],
          });

          const tx = await sign([executeMsg], "Lock KART");

          await get().actions.getUserInfo(sender, query);
          await get().actions.getAppInfo(query);
          await stakingApiService.stakeToken({
            address: sender,
            amount: amount,
            txHash: tx.transactionHash,
            txDate: new Date(),
            txType: ETXTYPE.STAKE
          })
        } catch (err) {
          console.error(err);
          throw err;
        } finally {
          get().actions.setLoading(false);
        }
      },

      async unbond(amount, sender, sign, query) {
        get().actions.setLoading(true);

        try {
          const executeMsg = msg.wasm.msgExecuteContract({
            contract: STAKING_ADDR,
            sender: sender,
            msg: Buffer.from(
              JSON.stringify({
                unbond: {
                  tokens: fromHumanString(String(amount), 6).toString(),
                },
              }),
            ),
            funds: [],
          });

          const tx = await sign([executeMsg], "Unlock KART");

          await get().actions.getUserInfo(sender, query);
          await get().actions.getAppInfo(query);
          await stakingApiService.stakeToken({
            address: sender,
            amount: amount,
            txHash: tx.transactionHash,
            txDate: new Date(),
            txType: ETXTYPE.UNSTAKE
          })
        } catch (err) {
          console.error(err);
          throw err;
        } finally {
          get().actions.setLoading(false);
        }
      },

      async claim(sender, sign, query) {
        get().actions.setLoading(true);

        try {
          const executeMsg = msg.wasm.msgExecuteContract({
            contract: STAKING_ADDR,
            sender: sender,
            msg: Buffer.from(JSON.stringify({ claim: {} })),
            funds: [],
          });

          const tx = await sign([executeMsg], "Claim unstake");

          await get().actions.getUserInfo(sender, query);
          await get().actions.getAppInfo(query);
          await stakingApiService.stakeToken({
            address: sender,
            txHash: tx.transactionHash,
            txDate: new Date(),
            txType: ETXTYPE.CLAIM
          })
        } catch (err) {
          console.log(err);
        } finally {
          get().actions.setLoading(false);
        }
      },

      async withdraw(sender, sign, query) {
        get().actions.setLoading(true);

        try {
          const executeMsg = msg.wasm.msgExecuteContract({
            contract: REWARDS_ADDR,
            sender: sender,
            msg: Buffer.from(JSON.stringify({ claim_rewards: {} })),
            funds: [],
          });

          const tx = await sign([executeMsg], "Claim Rewards");

          await get().actions.getUserInfo(sender, query);
          await get().actions.getAppInfo(query);
          await stakingApiService.stakeToken({
            address: sender,
            txHash: tx.transactionHash,
            txDate: new Date(),
            txType: ETXTYPE.WITHDRAW
          })
        } catch (err) {
          console.log(err);
        } finally {
          get().actions.setLoading(false);
        }
      },

      async addReward(amount, denom, schedule, sender, sign, query) {
        get().actions.setLoading(true);

        try {
          const executeMsg = msg.wasm.msgExecuteContract({
            contract: REWARDS_ADDR,
            sender: sender,
            msg: Buffer.from(JSON.stringify({ add_incentive: { denom, schedule } })),
            funds: [
              coin(fromHumanString(String(amount), 6).toNumber(), denom),
            ],
          });

          const tx = await sign([executeMsg], "Add Rewards");

          await get().actions.getUserInfo(sender, query);
          await get().actions.getAppInfo(query);
        } catch (err) {
          console.log(err);
        } finally {
          get().actions.setLoading(false);
        }
      },

      setLoading(status: boolean) {
        set({
          app: {
            ...get().app,
            loading: status,
          },
        });
      },
    },
  };
});

export const useAppState = () => useAppStore((state) => state.app);
export const useAppActions = () => useAppStore((state) => state.actions);
