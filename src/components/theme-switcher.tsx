"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const { resolvedTheme } = useTheme();

  return (
    <div>
      {resolvedTheme === "dark" ? (
        <span
          className="flex gap-2 items-center cursor-pointer w-full"
          onClick={() => setTheme("light")}
        >
          <Sun /> Set to Light mode
        </span>
      ) : (
        <span
          className="flex gap-2 items-center cursor-pointer w-full"
          onClick={() => setTheme("dark")}
        >
          <Moon />
          set to dark mode
        </span>
      )}
    </div>
  );
}
