"use client";

import { BadgeCheck, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchDialouge } from "@/components/search-dialouge";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLoginMutation } from "@/store/features/authentication/authApi";
const UserAvatar = ({ user }: { user: any }) => {
  return (
    <div className="flex items-center space-x-3 hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors duration-200">
      <Avatar className="h-10 w-10">
        <AvatarImage
          className="object-cover"
          src={user?.avatar}
          alt={user?.fullName}
        />
        <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col ">
            <span className="font-semibold text-sm text-foreground">
              {user?.fullName}
            </span>
            <span className="text-xs text-foreground-muted">
              @{user?.username}
            </span>
          </div>

          {user?.isVerified && <BadgeCheck className="h-6 w-6 text-primary" />}
        </div>
      </div>
    </div>
  );
};

const TopRightMenu = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const auth = useSelector((state: any) => state.auth);
  return (
    <div className="flex items-center gap-4">
      <SearchDialouge />
      {isDesktop ? (
        auth.isAuthenticated ? (
          <UserAvatar user={auth?.user} />
        ) : (
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
        )
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* <Skeleton className="h-16 w-16 rounded-full" /> */}
            {auth.isAuthenticated ? <UserAvatar user={auth?.user} /> : <User />}
          </DropdownMenuTrigger>
          {auth.isAuthenticated ? (
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  useLoginMutation();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent>
              <Link href="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href="/register">
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      )}
    </div>
  );
};

export default TopRightMenu;
