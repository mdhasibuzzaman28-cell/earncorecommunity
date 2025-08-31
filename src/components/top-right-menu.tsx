"use client";

import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchDialouge } from "@/components/search-dialouge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "./ui/button";
import Link from "next/link";
const TopRightMenu = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex items-center gap-4">
      <SearchDialouge />
      {isDesktop ? (
        <div className="flex items-center gap-2 border-l pl-4">
          <Link href="/login">
            <Button variant="outline" className="rounded-3xl">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="rounded-3xl">Join</Button>
          </Link>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>Login</DropdownMenuLabel>
                    <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Login</DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default TopRightMenu;
