import { SocialLinks } from "../../constant";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="z-20 border-t bg-opacity-80 shadow-purple-0.5 drop-shadow-sm border border-purple-0.15">
      <div className="flex items-center justify-between px-6 py-8 sm:mx-20 lg:px-8">
        <div className="sm:mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-white">
            KART Staking © 2024, All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          {SocialLinks.map((item, index) => (
            <Link key={index} href={item.href} target="_blank">
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
