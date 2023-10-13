"use client";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed flex top-0 items-center w-full p-6 dark:bg-[#1f1f1f]",
        scrolled ? "border-b shadow-sm" : ""
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end gap-x-2 flex items-center justify-between w-full">
        <ModeToggle />
      </div>
    </div>
  );
};
