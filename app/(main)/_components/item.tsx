"use client";

import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}
export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  documentIcon,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;

    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((id) => {
      if (!expanded) onExpand?.();

      // router.push(`/documents/${id}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created!",
      error: "Failed to create note",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="hover:bg-neutral-300 dark:hover:bg-neutral-600 h-full rounded-sm"
          onClick={handleExpand}
        >
          <ChevronIcon className="shrink-0 text-muted-foreground/50 w-4 h-4" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="gap-x-2 flex items-center ml-auto"
        >
          <div className="group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 h-full ml-auto rounded-sm opacity-0">
            <Plus className="text-muted-foreground w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};
