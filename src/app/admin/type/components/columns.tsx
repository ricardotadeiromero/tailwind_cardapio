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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResponsiveDialog } from "../../components/responsive-dialog";
import Image from "next/image";
import { FoodType } from "@/app/interface/FoodType";
import { deleteFoodData } from "@/app/hooks/deleteFoodData";
import FormType from "./FormType";
import { deleteTypeData } from "@/app/hooks/type/deleteTypeData";

export const columns: ColumnDef<FoodType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const type = row.original;
      const [isEditDialogOpen, setEditDialogOpen] = useState(false);
      const { mutate } = deleteTypeData();

      return (
        <>
          <ResponsiveDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setEditDialogOpen}
            title="Editar o item"
          >
            <FormType type={type} />
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
                <Delete mutate={mutate} id={type.id!} />
              </DropdownMenuItem>
              <DropdownMenuItem>Ver detalhes do pagamento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
