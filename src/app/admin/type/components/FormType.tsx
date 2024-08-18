"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateFoodData } from "@/app/hooks/updateFoodData";
import { useFoodType } from "@/app/hooks/useFoodType";
import { FoodType } from "@/app/interface/FoodType";
import { TypeSchema } from "@/app/schema/TypeSchema";
import { useTypeDataMutate } from "@/app/hooks/type/useTypeDataMutate";
import { updateTypeData } from "@/app/hooks/type/updateTypeData";

interface FormTypeProps {
  type?: FoodType | null;
}

export default function FormType({ type }: FormTypeProps) {
  const router = useRouter();
  const { mutate: create } = useTypeDataMutate();
  const { mutate: update } = updateTypeData();

  const form = useForm<z.infer<typeof TypeSchema>>({
    resolver: zodResolver(TypeSchema),
    defaultValues: {
      name: type?.name || "",
    },
  });

  async function onSubmit(data: z.infer<typeof TypeSchema>) {
    if (type) {
      update({
        id: type.id,
        name: data.name,
      });
    } else {
      create({
        name: data.name,
      });
    }
    router.push("/admin");
  }

  useEffect(() => {
    if (type) {
      form.setValue("name", type.name);
    }
  }, [type, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex justify-between  items-center">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="w-[80%]" placeholder="título" {...field} />
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
