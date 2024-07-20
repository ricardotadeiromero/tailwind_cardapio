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
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { FoodSchema } from "@/app/schema/FoodSchema";
import { useFoodDataMutate } from "@/app/hooks/useFoodDataMutate";

interface FormTestProps {
  setOpen(state: boolean): void;
}

export default function FormTest({ setOpen }: FormTestProps) {
  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
  });
  const { mutate } = useFoodDataMutate();
  function onSubmit(data: z.infer<typeof FoodSchema>) {
    mutate(data);
    setOpen(false);
  }
  function close() {
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
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
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="image" {...field} />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" {...field} />
              </FormControl>
              <FormDescription>Preço do item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button onClick={close}>Cancel</Button>
          <Button type="submit" variant="new">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
