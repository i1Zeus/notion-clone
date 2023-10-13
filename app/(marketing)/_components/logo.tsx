import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="md:flex items-center hidden gap-2">
      <Image
        src="/Logo.svg"
        height={40}
        width={40}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/Logo-dark.svg"
        height={40}
        width={40}
        alt="Logo"
        className="dark:block hidden"
      />
      <p className={cn("font-semibold ", font.className)}>Zotion</p>
    </div>
  );
};
