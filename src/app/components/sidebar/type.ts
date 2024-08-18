import { User } from "@/app/interface/User";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  user?: User | null;
  extras?: ReactNode;
  signOut: () => void;
}
