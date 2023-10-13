"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="sm:text-5xl md:text-6xl text-3xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Zotion</span>
      </h1>
      <h3 className="sm:text-xl md:text-2xl text-base">
        Zotion is the connected workspace where
        <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Zotion
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}

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
    </div>
  );
};
