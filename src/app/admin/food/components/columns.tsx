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
import Delete from "../../components/delete";
import { useRouter } from "next/navigation"; // Correção na importação
import FormFood from "./FormFood";
import { useState } from "react";
import { ResponsiveDialog } from "../../components/responsive-dialog";
import Image from "next/image";
import { FoodType } from "@/app/interface/FoodType";
import { deleteFoodData } from "@/app/hooks/deleteFoodData";
import { toURL } from "@/app/services/image";

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
    accessorKey: "description",
    header: "Descrição",

    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return <p className="truncate md:max-w-md max-w-sm">{description}</p>;
    },
  },
  {
    accessorKey: "ingredients",
    header: "Ingredientes",

    cell: ({ row }) => {
      const ingredients: string = row.getValue("ingredients");
      return <p className="truncate md:max-w-md max-w-sm">{ingredients}</p>;
    },
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
    accessorKey: "type",
    header: "Categoria",
    cell: ({ row }) => {
      const type: FoodType = row.getValue("type");
      return type.name;
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
      const { mutate } = deleteFoodData();
      const handleEdit = () => {
        router.push("/admin/" + food.id);
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
                <Delete mutate={mutate} id={food.id!} />
              </DropdownMenuItem>
              <DropdownMenuItem>Ver detalhes do pagamento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
