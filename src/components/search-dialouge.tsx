"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/search-dialog-ui";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommandInput } from "./ui/command";
import { Search } from "lucide-react";
import { SearchForm } from "./search-form";

export function SearchDialouge() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SearchForm />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[495px]">
          <div className="flex items-center gap-2 mt-2 border-b-1">
            <Search />
            <input
              type="text"
              placeholder="Search or ask a question"
              className="w-full outline-none p-2"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Search />
            <h2 className="text-center font-semibold text-xl">
              Search the community
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Try searching for keywords in posts, comments, events, lessons,
              spaces and more...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SearchForm />
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-2  border rounded-lg w-full bg-background dark:bg-input/30">
              <Search className="w-6 h-6 ml-2" />
              <input
                type="text"
                placeholder="Search or ask a question"
                className="w-full outline-none p-[5px]"
              />
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <Search />
            <h2 className="text-center font-semibold text-xl">
              Search the community
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Try searching for keywords in posts, comments, events, lessons,
              spaces and more...
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
