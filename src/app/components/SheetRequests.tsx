import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useEffect } from "react";
import { FoodContext } from "../contexts/FoodContext";
import { Separator } from "@/components/ui/separator";
import RequestItem from "./RequestItem";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CurrencyFormatter from "./CurrencyFormatter";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";

export function SheetRequests() {
  const { requests, setSheetOpen, sheetOpen } = useContext(FoodContext);
  const total = requests.reduce(
    (acc, item) => acc + item.food.price * item.amount,
    0
  );
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="text-white flex gap-[2px] items-center"
        >
          <ShoppingCart />
          <span className="text-sm font-light">
            <CurrencyFormatter value={total} />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de pedidos</SheetTitle>
          <SheetDescription>Aqui estão seu pedidos!</SheetDescription>
          <Separator />
        </SheetHeader>
        <ScrollArea className="max-h-[720px] overflow-auto">
          <div>
            {requests.map((request) => (
              <RequestItem key={request.id} req={request} />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex flex-col w-full justify-center gap-2 pt-4">
            {total > 0 ? (
              <span className="text-primary font-light">
                O total a pagar será: <CurrencyFormatter value={total} />
              </span>
            ) : null}
            <SheetClose asChild>
              <Button disabled={total <= 0} type="submit">
                Finalizar pedido
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
