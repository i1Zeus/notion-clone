"use client";

import Image from "next/image";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url)
      await edgestore.publicFiles.delete({
        url: url,
      });

    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="group-hover:opacity-100 right-5 bottom-5 absolute flex items-center gap-2 transition opacity-0">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-sm"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-sm"
            variant="outline"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
