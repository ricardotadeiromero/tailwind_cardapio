import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormFood from "./FormFood";

export function New() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Novo item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie um novo item</DialogTitle>
        </DialogHeader>
        <FormFood />
      </DialogContent>
    </Dialog>
  );
}
