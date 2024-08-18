"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FoodSchema } from "@/app/schema/FoodSchema";
import { useFoodDataMutate } from "@/app/hooks/useFoodDataMutate";
import { useRouter } from "next/navigation";
import { FoodData } from "@/app/interface/FoodData";
import { updateFoodData } from "@/app/hooks/updateFoodData";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFoodType } from "@/app/hooks/useFoodType";
import { register } from "module";
import Image from "next/image";
import { foodImgToFile, toURL } from "@/app/services/image";

interface FormFoodProps {
  foodData?: FoodData | null;
}

export default function FormFood({ foodData }: FormFoodProps) {
  const router = useRouter();
  const [img, setImg] = useState<string | null>(null);
  const { data: types } = useFoodType();
  const { mutate: create } = useFoodDataMutate();
  const { mutate: update } = updateFoodData();

  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      title: foodData?.title || "",
      description: foodData?.description || "",
      ingredients: foodData?.ingredients || "",
      type: foodData?.type?.name || "",
      price: foodData?.price,
    },
  });

  async function onSubmit(data: z.infer<typeof FoodSchema>) {
    const dataType = types.find((type) => type.name === data.type);
    const formData = new FormData();
    
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("ingredients", data.ingredients);
    formData.append("price", data.price.toString());
    formData.append("image", data.image ? data.image : "");
    formData.append("type.id", dataType?.id!);
    formData.append("type.name", dataType?.name!);
    if (foodData) {
      formData.append("id", foodData.id!);
      update(formData);
    } else {
      create(formData);
    }
  }
  const fetchImage = async () => {
    if (foodData) {
      const file = await foodImgToFile(foodData.image);
      form.setValue("image", file);
    }
  };
  useEffect(() => {
    if (foodData) {
      setImg(foodData?.image);
      form.setValue("title", foodData.title);
      form.setValue("price", foodData.price);
      form.setValue("description", foodData.description);
      form.setValue("ingredients", foodData.ingredients);
      form.setValue("type", foodData.type!.name);
      fetchImage();
    }
  }, [foodData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex justify-between  items-center">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input className="w-[80%]" placeholder="título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="flex justify-between items-center">
              <FormLabel>Imagem</FormLabel>
              <FormControl>
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
                      onChange(file); // Atualiza o valor no formulário
                      setImg(URL.createObjectURL(file)); // Atualiza a prévia da imagem
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {img && (
          <div className="w-full flex items-center justify-center">
            <Image src={img} height={40} width={80} alt="image" />
          </div>
        )}
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="price"
            render={({ field: { onChange, value, name, ref, onBlur } }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    name={name}
                    ref={ref}
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => {
                      onChange(parseFloat(e.target.value));
                    }}
                    type="number"
                    placeholder="Preço"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="w-[75%]"
                  placeholder="Descrição"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center">
              <FormLabel>Ingredientes</FormLabel>
              <FormControl>
                <Textarea
                  className="w-[75%]"
                  placeholder="Ingredientes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" variant="default">
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
