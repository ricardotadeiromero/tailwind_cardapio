"use client";
import { chanageStatusOrder } from "@/app/hooks/order/changeStatusOrder";
import { Order, Status } from "@/app/interface/Order";
import { ChangeStatusOrderSchema } from "@/app/schema/ChangeStatusOrderSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface FormOrderProps {
  order: Order;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormOrder({ order, setIsOpen }: FormOrderProps) {
  const { mutate: changeStatus } = chanageStatusOrder();
  const form = useForm<z.infer<typeof ChangeStatusOrderSchema>>({
    resolver: zodResolver(ChangeStatusOrderSchema),
    defaultValues: {
      status: order.status,
    },
  });

  useEffect(() => {
    form.setValue("status", order.status!);
  }, [form, order]);

  async function onSubmit(data: z.infer<typeof ChangeStatusOrderSchema>) {
    changeStatus({ id: order.id!, status: data.status! });
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-3"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="ONGOING">ONGOING</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
