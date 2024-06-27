import dynamic from "next/dynamic";

const HomeSection = dynamic(() => import("@/section/home"), { ssr: false });

export default function Home() {
  return <HomeSection />;
}
