"use client";

import { Label } from "@/components/ui/label";
import { useSittings } from "@/hooks/use-settings";
import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export const SettingsModal = () => {
  const settings = useSittings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onOpen}>
      <DialogContent>
        <DialogHeader className="border-b pb-2">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how zotion looks on you&apos;r device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
