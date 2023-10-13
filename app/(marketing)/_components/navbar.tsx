"use client";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "./logo";
import { useConvexAuth } from "convex/react";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
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
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Zotion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Zotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
