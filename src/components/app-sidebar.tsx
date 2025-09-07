"use client";
import * as React from "react";
import { ChevronRight, icons } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SearchDialouge } from "./search-dialouge";
import { isAbsolute } from "path";

import Image from "next/image";
//Icons Import
import chatgpt from "../assets/icons/chatgpt.png";
import claude from "../assets/icons/claude.png";
import deepseek from "../assets/icons/deepseek.png";
import gork from "../assets/icons/gork.png";
import midjourney from "../assets/icons/midjourney.png";
import hiringGame from "../assets/icons/chess-piece.png";
import Link from "next/link";
import { useGetAllCommunitiesQuery } from "@/store/features/community/communityApi";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    // {
    //   title: "Communities",
    //   url: "/dashboard/feed",
    //   items: [
    //     {
    //       title: "ChatGPT",
    //       url: "/dashboard/feed",
    //       icon: chatgpt,
    //     },
    //     {
    //       title: "claudeAI",
    //       url: "/dashboard/feed",
    //       icon: claude,
    //     },
    //     {
    //       title: "Mid Journey",
    //       url: "/dashboard/feed",
    //       icon: midjourney,
    //     },
    //     {
    //       title: "DeepSeek",
    //       url: "/dashboard/feed",
    //       icon: deepseek,
    //     },
    //     {
    //       title: "Gork",
    //       url: "/dashboard/feed",
    //       icon: gork,
    //     },
    //   ],
    // },
    {
      title: "Courses",
      url: "#",
      items: [
        {
          title: "Master The Hiring Game",
          url: "/dashboard/course/1",
          icon: hiringGame,
        },
      ],
    },
  ],
};

const makeLink = (href: string) => href.toLowerCase().replaceAll(" ", "-");

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: communities = [] } = useGetAllCommunitiesQuery();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger className="font-bold!">
                  Communities
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {communities.map((item) => (
                      <SidebarMenuItem key={item?._id}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={`/dashboard/feed/${makeLink(item?.name)}`}
                          >
                            <div className="flex items-center gap-2">
                              {item?.icon && (
                                <img
                                  width={20}
                                  src={
                                    item?.icon ||
                                    "http://res.cloudinary.com/mdhasib/image/upload/v1757133279/jhjgy8r5uuellcbqmts7.png"
                                  }
                                  alt="logo"
                                ></img>
                              )}
                              {item?.name}
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger className="font-bold!">
                  {item.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {/* <SidebarMenuButton asChild isActive={item.isActive}> */}
                        <SidebarMenuButton asChild>
                          <div>
                            {item.icon && (
                              <Image
                                width={20}
                                src={item.icon}
                                alt="logo"
                              ></Image>
                            )}
                            <Link href={item.url}>{item.title}</Link>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
