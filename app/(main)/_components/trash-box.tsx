"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });

    if (params.documentId === documentId) router.push("/documents");
  };

  if (documents === undefined)
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="text-sm">
      <div className="gap-x-1 flex items-center p-2">
        <Search className="w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 focus-visible:ring-transparent bg-secondary px-2"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="px-2 pb-1 mt-2">
        <p className="last:block text-muted-foreground hidden pb-2 text-sm text-center">
          No document found
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => {
              onClick(document._id);
            }}
            className="hover:bg-primary/5 text-primary flex items-center justify-between w-full text-sm rounded-sm"
          >
            <span className="truncate">{document.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => {
                  onRestore(e, document._id);
                }}
                className="hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 rounded-sm"
              >
                <Undo className="text-muted-foreground w-4 h-4" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 rounded-sm"
                >
                  <Trash className="text-muted-foreground w-4 h-4" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
