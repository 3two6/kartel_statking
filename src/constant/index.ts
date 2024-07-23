import { KART_DENOM, USK_DENOM } from "./token";

type KartPosition = {
  label: string;
  value: number;
  unit?: string;
};

export interface IToken {
  name: string;
  src: string;
  denom: string;
}

export const NavItems = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Stake",
    href: "/staking",
  },
];

export const KartPositions: KartPosition[] = [
  { label: "Staking APR", value: 28.48, unit: "%" },
  { label: "Available", value: 0 },
];

export const Stakings = [
  { label: "Market Cap", value: 4807737, unit: "$" },
  { label: "Circulating Supply", value: 151606080, unit: "kart" },
  { label: "Staking APR", value: 28.48, unit: "%" },
  { label: "KART Price", value: 0.032, unit: "USDC" },
];

export const StakingOptions = [
  { label: "Stake", value: "stake" },
  { label: "Unstake", value: "unstake" },
];

export const SocialLinks = [
  {
    label: "Twitter",
    value: "twitter",
    icon: "/images/layouts/twitter.svg",
    href: "https://x.com/kartelProject",
  },
  {
    label: "Telegram",
    value: "telegram",
    icon: "/images/layouts/telegram.svg",
    href: "https://t.me/thekartelprojectchat",
  },
];

export enum EFilterDate {
  week = "7d",
  month = "30d",
  year = "1Y",
}

export const chartData = {
  options: {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      labels: {
        style: {
          colors: "#d1d5db",
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: "#d1d5db",
        },
      },
    },
    grid: {
      borderColor: "#b7b4b4a8",
      strokeDashArray: 4,
    },
  },
  series: [
    {
      name: "KART",
      data: [0, 2, 3, 4, 5, 6, 7, 10],
      color: "#A326D4",
      labels: {
        colors: "#d1d5db",
      },
    },
  ],
};

export const token: Array<IToken> = [
  {
    name: "kart",
    src: "/images/tokens/kart.png",
    denom: KART_DENOM,
  },
  {
    name: "usk",
    src: "/images/tokens/usk.png",
    denom: USK_DENOM,
  },
];

export const CBACKEND_ENDPOINT = {
  staking: {
    base: "/staking",
    create: "/staking/create",
    history: "/staking/history",
  },
  dashboard: {
    base: "/dashboard",
    kartCurrency: "/dashboard/kart-currency",
  },
};