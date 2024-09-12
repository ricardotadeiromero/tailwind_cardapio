"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FoodData } from "../interface/FoodData";
import { OrderItem } from "../interface/OrderItem";
import { AuthContext } from "./AuthContext";
import { redirect, useRouter } from "next/navigation";

interface FoodContextProps {
  children: ReactNode;
}

type FoodContextType = {
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  sheetOpen: boolean;
  requests: OrderItem[];
  addRequest: (request: {
    id?: number;
    food: FoodData;
    amount: number;
  }) => void;
  setRequests: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  removeRequest: (id: number) => void;
};

export const FoodContext = createContext({} as FoodContextType);

export default function FoodProvider({ children }: FoodContextProps) {
  const [requests, setRequests] = useState<OrderItem[]>([]);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(1);

  function addRequest(request: {
    id?: number;
    food: FoodData;
    amount: number;
  }): void {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    const newRequest = { ...request, id: id };
    setRequests((prev) => [newRequest, ...prev]);
    setId((prev) => prev + 1);
    setSheetOpen(true);
  }

  function removeRequest(id: number): void {
    setRequests((prev) => prev.filter((request) => request.id != id));
  }
  return (
    <FoodContext.Provider
      value={{ addRequest, removeRequest, setSheetOpen, setRequests, sheetOpen, requests }}
    >
      {children}
    </FoodContext.Provider>
  );
}
