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
import { useOrderDataMutate } from "../hooks/order/useOrderDataMutate";
import { foodImgToFile } from "../services/image";

export function SheetRequests() {
  const { requests, setRequests, setSheetOpen, sheetOpen } = useContext(FoodContext);
  const { user } = useContext(AuthContext);
  const { mutate } = useOrderDataMutate();
  const amount = requests.reduce(
    (acc, item) => acc + item.food.price * item.amount,
    0
  );

  function handleClick() {
    if (user) {
      const transformedItems = requests.map((req) => ({
        foodId: req.food.id!,
        amount: req.amount
      }));
      mutate({ client: user.id!, items: transformedItems });
      setRequests([]);
    }
  }
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="text-white flex gap-[2px] items-center"
        >
          <ShoppingCart />
          <span className="text-sm font-light">
            <CurrencyFormatter value={amount} />
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
            {amount > 0 ? (
              <span className="text-primary font-light">
                O amount a pagar será: <CurrencyFormatter value={amount} />
              </span>
            ) : null}
            <SheetClose asChild>
              <Button
                disabled={amount <= 0}
                onClick={handleClick}
                type="submit"
              >
                Finalizar pedido
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
