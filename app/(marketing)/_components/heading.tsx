"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
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
      <Button>
        Enter Zotion
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
