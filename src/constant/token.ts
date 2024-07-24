const isProduction = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const KART_DENOM =
  isProduction
    ? "factory/kujira13x2l25mpkhwnwcwdzzd34cr8fyht9jlj7xu9g4uffe36g3fmln8qkvm3qn/ukart"
    : "factory/kujira1sr9xfmzc8yy5gz00epspscxl0zu7ny02gv94rx/kartel";

export const USK_DENOM =
  isProduction
    ? "factory/kujira1qk00h5atutpsv900x202pxx42npjr9thg58dnqpa72f2p7m2luase444a7/uusk"
    : "factory/kujira1sr9xfmzc8yy5gz00epspscxl0zu7ny02gv94rx/kartelUSk";

export const STAKING_ADDR =
  isProduction ?
    "kujira19ljqgzgu97guv0f6wja2h2fk4afzjfxf5lw62mu9r8mupnz7f6vspqqksx" :
    "kujira1fazgz2qxpxz3wfjvmjdgd5qc7g86vxd6e944azje9e9e5qtk2nwsl6tv8n";

export const REWARDS_ADDR =
  isProduction ?
    "kujira1uhy0hw0fttvkppy4f0hw8x7dv2glkr0pe6pqcnsptmtjcufgpehs4eefkm" :
    'kujira1m8l5r3q7lsrx5xuwssf0zsdunllmtlynkvl4vpj8qmx9nr9smq8q29vhey';
