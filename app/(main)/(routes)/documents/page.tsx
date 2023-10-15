"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
  const { user } = useUser();
  return (
    <div className=" flex flex-col items-center justify-center h-full space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:block hidden"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Zotion
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
