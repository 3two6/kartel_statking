"use client";

import Image from "next/image";
import Footer from "./footer";
import Header from "./header";
import { ReactNode } from "react";

export default function AppLayouts({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex flex-col bg-opacity-90 bg-gradient-to-b from-dark-0.7 to-dark bg-blend-multiply">
            <Header />
            <div className="relative w-full grow overflow-y-auto">
                {/* <div className="absolute left-0 top-0 z-0 h-1/4 w-full bg-gradient-to-r from-white via-[#BFC6FF80]/50 to-[#83FF9E40]/25"></div>
                <div className="absolute bottom-0 left-0 z-0 h-3/4 w-full overflow-hidden opacity-10">
                    <div style={{ width: "110%", height: "100%", position: "relative", left: "-5%" }}>
                        <Image alt="Kart background" sizes="100vw" width={1920} height={1080} src="/images/home/background.png" style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", objectFit: "cover", color: "transparent" }} />
                    </div>
                </div> */}
                {children}
            </div>
            <Footer />
        </div>
    )
}