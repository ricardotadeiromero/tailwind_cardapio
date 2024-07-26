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

export default function UserMenu() {
  const { signOut, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        {isAuthenticated && (
          <DropdownMenuItem
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
