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
import { toURL } from "../services/image";

export default function UserMenu() {
  const { signOut, isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();

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
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          Perfil
        </DropdownMenuItem>
        {isAuthenticated && (
          <DropdownMenuItem
            onClick={() => {
              router.push("/admin");
            }}
          >
            Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
