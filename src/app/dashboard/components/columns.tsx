"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FoodData } from "@/app/interface/FoodData";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Delete from "./delete";
import { useRouter } from "next/navigation"; // Correção na importação
import FormFood from "./FormFood";
import { useState } from "react";
import { ResponsiveDialog } from "./responsive-dialog";
import Image from "next/image";

export const columns: ColumnDef<FoodData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "image",
    header: "Imagem",
    cell: ({ row }) => {
      const image: string = row.getValue("image");
      return (
        <div className="relative w-[70px] h-[50px]">
          <Image src={image} alt="item" fill={true} />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const food = row.original;
      const router = useRouter(); // Correção: uso do hook useRouter
      const [isEditDialogOpen, setEditDialogOpen] = useState(false);

      const handleEdit = () => {
        router.push("/dashboard/" + food.id);
      };

      return (
        <>
          <ResponsiveDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setEditDialogOpen}
            title="Editar o item"
          >
            <FormFood foodData={food} />
          </ResponsiveDialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Delete id={food.id!} />
              </DropdownMenuItem>
              <DropdownMenuItem>Ver detalhes do pagamento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
