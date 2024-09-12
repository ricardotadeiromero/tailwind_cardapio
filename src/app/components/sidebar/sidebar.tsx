"use client";

import {
  Bell,
  Bookmark,
  ChartColumn,
  ConciergeBell,
  Home,
  List,
  Mail,
  MoreHorizontal,
  Pizza,
  User,
  Users,
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "./type";
import { SidebarButton } from "./sidebar-button";

import { SidebarMobile } from "./sidebar-mobile";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

export function Sidebar() {
  const { user, signOut } = useContext(AuthContext);
  const sidebarItems: SidebarItems = {
    links: [
      { label: "Home", href: "/admin", icon: Home },
      { label: "Cardápio", href: "/admin/food", icon: Pizza },
      { label: "Categorias", href: "/admin/type", icon: ChartColumn },
      {
        label: "Pedidos", href: "/admin/order", icon: ConciergeBell
      },
      {
        href: "/",
        icon: List,
        label: "Menu",
      },

      {
        href: "/profile",
        icon: User,
        label: "Perfil",
      },
      
    ],
    signOut: signOut,
    user: user,
    extras: (
      <div className="flex flex-col gap-2">
        <SidebarButton icon={MoreHorizontal} className="w-full">
          More
        </SidebarButton>
        <SidebarButton
          className="w-full justify-center text-white"
          variant="default"
        >
          ...
        </SidebarButton>
      </div>
    ),
  };
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
