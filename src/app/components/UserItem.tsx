"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";

export default function UserItem() {
  const { user } = useContext(AuthContext);
  const isDesk = useMediaQuery("(min-width: 768px)");
  if (isDesk) {
    return (
      <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grow">
          <p className="text-[16px] font-bold">{user?.username}</p>
          <p className="text-[12px] text-neutral-500">{user?.email}</p>
        </div>
      </div>
    );
  }

  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
