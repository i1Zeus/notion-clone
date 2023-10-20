"use client";

import Image from "next/image";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "creating new note",
      success: "note created",
      error: "failed to create note",
    });
  };

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
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
