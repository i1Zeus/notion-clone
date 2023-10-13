import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="bg-background z-50 flex items-center w-full p-6">
      <Logo />
      <div className="md:ml-auto md:justify-end gap-x-2 text-muted-foreground flex items-center justify-between w-full">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Police
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
