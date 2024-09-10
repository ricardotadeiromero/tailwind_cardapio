import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface MenuItemsProps {
  label: string;
  link: string | null;
  admin: boolean;
  action: Function | null;
}

export default function UserMenu() {
  const { signOut, isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();

  function handleClickDropDown(item: MenuItemsProps) {
    if (item.link) {
      router.push(item.link);
    }
    if (item.action) {
      item.action();
    }
  }
  const menuItems: MenuItemsProps[] = [
    {
      label: "Perfil",
      link: "/profile",
      admin: false,
      action: null,
    },
    {
      label: "Admin",
      link: "/admin",
      admin: true,
      action: null,
    },
    {
      label: "Logout",
      link: null,
      admin: false,
      action: signOut,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          if (item.admin && user && user.role.id >= 3) {
            return null;
          }
          return (
            <DropdownMenuItem
              key={item.label}
              onClick={() => handleClickDropDown(item)}
            >
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
