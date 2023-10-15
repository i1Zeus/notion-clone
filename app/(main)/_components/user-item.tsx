"use client";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="hover:bg-primary/5 flex items-center w-full p-3 text-sm"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start line-clamp-1 font-medium">
              {user?.fullName}&apos;s Zotion
            </span>
          </div>
          <ChevronsLeftRight className="text-muted-foreground w-4 h-4 mr-2 rotate-90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-90"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col p-2 space-y-4">
          <p className="text-muted-foreground text-xs font-medium leading-none">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="gap-x-2 flex items-center">
            <div className="bg-secondary p-1 rounded-md">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user?.fullName}&apos;s Zotion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-muted-foreground w-full cursor-pointer"
          asChild
        >
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
