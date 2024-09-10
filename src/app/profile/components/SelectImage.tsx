import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SelectImageProps {
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: (...event: any[]) => void;
  setImg: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectImage = React.forwardRef<HTMLInputElement, SelectImageProps>(
  ({ name, onBlur, onChange, setImg }, ref) => {
    const isDesktop = useMediaQuery("(min-width:768px)");
    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger>Alterar imagem</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecione uma imagem</DialogTitle>
              <DialogDescription>
                Por favor, selecione uma imagem para fazer upload.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="file"
              accept="image/*"
              className="w-[80%]"
              placeholder="imagem"
              ref={ref}
              name={name}
              onBlur={onBlur}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImg(URL.createObjectURL(file)); // Chama a ação para atualizar a imagem
                  onChange(file); // Passa o evento para o formulário
                }
              }}
            />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Drawer>
        <DrawerTrigger>Alterar imagem</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Selecione uma imagem</DrawerTitle>
            <DrawerDescription>
              Por favor, selecione uma imagem para fazer upload.
            </DrawerDescription>
          </DrawerHeader>
          <Input
            type="file"
            accept="image/*"
            className="mx-auto w-[70%]"
            placeholder="imagem"
            ref={ref}
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImg(URL.createObjectURL(file)); // Chama a ação para atualizar a imagem
                onChange(file); // Passa o evento para o formulário
              }
            }}
          />
          <DrawerFooter>
            <Button>Enviar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);

export default SelectImage;
