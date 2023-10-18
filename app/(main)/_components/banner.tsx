"use client";

import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push(`/documents`);
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="bg-rose-500 gap-x-2 flex items-center justify-center w-full p-2 text-sm text-center text-white">
      <p>
        This page is in <span className="font-semibold">Trash</span>.
      </p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRestore}
        className="hover:bg-primary/5 hover:text-white h-auto p-1 px-2 font-normal text-white bg-transparent border-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          onClick={onRemove}
          className="hover:bg-primary/5 hover:text-white h-auto p-1 px-2 font-normal text-white bg-transparent border-white"
        >
          Delete for ever
        </Button>
      </ConfirmModal>
    </div>
  );
};
