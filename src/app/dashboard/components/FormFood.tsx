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
import React, { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { FoodSchema } from "@/app/schema/FoodSchema";
import { useFoodDataMutate } from "@/app/hooks/useFoodDataMutate";
import { useParams, useRouter } from "next/navigation";
import { FoodData } from "@/app/interface/FoodData";
import { updateFoodData } from "@/app/hooks/updateFoodData";

interface FormFoodProps {
  foodData?: FoodData | null;
}

export default function FormFood({ foodData }: FormFoodProps) {
  const router = useRouter();
  const { mutate: create } = useFoodDataMutate();
  const { mutate: update } = updateFoodData();

  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
  });
  async function onSubmit(data: z.infer<typeof FoodSchema>) {
    if (foodData) {
      update({ id: foodData.id, ...data });
    } else {
      create(data);
    }
    router.push("/dashboard");
  }
  useEffect(() => {
    if (foodData) {
      form.setValue("title", foodData.title);
      form.setValue("image", foodData.image);
      form.setValue("price", foodData.price);
    }
  }, [foodData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="título" {...form.register} {...field} />
              </FormControl>
              <FormDescription>Nome do item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <Input placeholder="imagem" {...form.register} {...field} />
              </FormControl>
              <FormDescription>Imagem do item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="price" {...form.register} {...field} />
              </FormControl>
              <FormDescription>Preço do item.</FormDescription>
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
