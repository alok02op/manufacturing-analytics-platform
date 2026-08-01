import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

import { mainNav } from "@/config/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export default function SiteHeader() {
  const { pathname } = useLocation();
  const { logoutUser } = useAuth();

  const page = mainNav.find((item) => item.path === pathname)?.title ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h1 className="text-xl font-semibold">{page}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 cursor-pointer text-muted-foreground" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="rounded-full"
              >
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}