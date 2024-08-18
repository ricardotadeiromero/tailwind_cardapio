"use client";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  BellIcon,
  Cookie,
  CreditCard,
  Inbox,
  LogOut,
  MessageSquare,
  Pizza,
  Settings,
  User,
} from "lucide-react";
import UserItem from "./UserItem";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";
import { useMediaQuery } from "../hooks/use-media-query";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { signOut } = useContext(AuthContext);
  const pathname = usePathname();
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: pathname + "/food",
          icon: <Pizza />,
          text: "Cardápio",
        },
        {
          link: "/",
          icon: <Inbox />,
          text: "Inbox",
        },
        {
          link: "/",
          icon: <CreditCard />,
          text: "Billing",
        },
        {
          link: "/",
          icon: <BellIcon />,
          text: "Notifications",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/",
          icon: <Settings />,
          text: "General Settings",
        },
        {
          link: "/",
          icon: <Cookie />,
          text: "Privacy",
        },
        {
          link: "/",
          icon: <MessageSquare />,
          text: "Logs",
        },
        {
          link: "/",
          icon: <LogOut />,
          text: "Logout",
          won: signOut,
        },
      ],
    },
  ];

  const isDesk = useMediaQuery("(min-width: 768px)");
  return (
    <div className="fixed flex flex-col gap-4 w-[70px] md:w-[200px] lg:w-[300px] max-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <CommandItem key={optionKey}>
                    <Link
                      key={optionKey}
                      className="flex gap-2 cursor-pointer items-center"
                      onClick={() => {
                        if (option.won) {
                          option.won();
                        }
                      }}
                      href={option.link}
                    >
                      {option.icon}
                      {isDesk && option.text}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>Settings / Notifications</div>
    </div>
  );
}
