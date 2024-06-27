type KartPosition = {
    label: string;
    value: number;
    unit?: string;
};

export const NavItems = [
    {
        label: 'Dashboard',
        href: '/',
    },
    {
        label: 'Stake',
        href: '/staking',
    },
];

export const Kartprices = [
    { label: "Rewards earned daily", value: "0 USD" },
    { label: "Kart price", value: "0.032 USDC" },
];


export const KartPositions: KartPosition[] = [
    { label: "Staking APR", value: 28.48, unit: "%" },
    { label: "Available", value: 0 },
];

export const Stakings = [
    { label: "Market Cap", value: 4807737, unit: "$" },
    { label: "Circulating Supply", value: 151606080, unit: "kart" },
    { label: "Staking APR", value: 28.48, unit: "%" },
    { label: "AQLA Price", value: 0.032, unit: "USDC" }
];

export const StakingOptions = [
    { label: "Stake", value: "stake" },
    { label: "Unstake", value: "unstake" },
];

export const SocialLinks = [
    { label: "Twitter", value: "twitter", icon: "/images/layouts/twitter.svg" },
    { label: "Telegram", value: "telegram", icon: "/images/layouts/telegram.svg" },
];

export const PortfolioDayOptions = [
    { label: "7d", value: 7 },
    { label: "30d", value: 14 },
    { label: "1Y", value: 365 },
];