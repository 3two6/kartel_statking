type KartPosition = {
  label: string;
  value: number;
  unit?: string;
};

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

export const Kartprices = [
  { label: "Rewards earned daily", value: "0 USD" },
  { label: "KART price", value: "0.032 USDC" },
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
  { label: "Twitter", value: "twitter", icon: "/images/layouts/twitter.svg" },
  {
    label: "Telegram",
    value: "telegram",
    icon: "/images/layouts/telegram.svg",
  },
];

export const PortfolioDayOptions = [
  { label: "7d", value: 7 },
  { label: "30d", value: 14 },
  { label: "1Y", value: 365 },
];

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
  },
  series: [
    {
      name: "kart",
      data: [0, 2, 3, 4, 5, 6, 7, 10],
      color: "#A326D4",
      labels: {
        colors: "#d1d5db",
      },
    },
  ],
};
