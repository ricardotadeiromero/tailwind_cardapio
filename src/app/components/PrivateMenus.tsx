import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UserMenu from "./UserMenu";
import { SheetRequests } from "./SheetRequests";
import Link from "next/link";

export default function PrivateMenus() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated && (
        <Link className="text-accent" href="/login">
          Login
        </Link>
      )}
      {isAuthenticated && <SheetRequests />}
      {isAuthenticated && <UserMenu />}
    </>
  );
}
