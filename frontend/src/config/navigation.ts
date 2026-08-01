import {
  LayoutDashboard,
  Factory,
  Workflow,
  Cpu,
  BarChart3,
  Upload,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Factories",
    path: "/factories",
    icon: Factory,
    disabled: false,
  },
  {
    title: "Production Lines",
    path: "/production-lines",
    icon: Workflow,
    disabled: true,
  },
  {
    title: "Machines",
    path: "/machines",
    icon: Cpu,
    disabled: true,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    disabled: true,
  },
  {
    title: "Upload CSV",
    path: "/upload",
    icon: Upload,
    disabled: true,
  },
];