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
  "kujira1s9kqaep4mwpufcu72hdv9a6ztsqmwuxfjhdmuuufhh590k702lasj6u47d";
