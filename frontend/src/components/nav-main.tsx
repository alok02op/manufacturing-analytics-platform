import { NavLink, useLocation } from "react-router-dom";

import { mainNav } from "@/config/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function NavMain() {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={
                  <NavLink
                    to={item.disabled ? "#" : item.path}
                    className={item.disabled ? "pointer-events-none opacity-50" : ""}
                  />
                }
                isActive={pathname === item.path}
                tooltip={item.title}
              >
                <item.icon />

                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}