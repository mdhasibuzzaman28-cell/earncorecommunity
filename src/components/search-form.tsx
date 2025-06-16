import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0 ">
        <SidebarGroupContent className="relative cursor-pointer ">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <input
            id="search"
            placeholder="Search"
            className="pl-10 border rounded-4xl p-2 cursor-pointer max-w-[150px]"
          />
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-50 select-none " />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
