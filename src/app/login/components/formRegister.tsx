"use client";
import { UserSchema } from "@/app/schema/UserSchema";
import React, { useContext } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/app/contexts/AuthContext";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { registerUser } from "@/app/hooks/registerUser";

export default function FormRegister() {
  const { mutate } = registerUser();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  const { signIn, loading } = useContext(AuthContext);

  function onSubmit({ username, email, password }: z.infer<typeof UserSchema>) {
    mutate({ username, email, password });
  }

  return (
    <Form {...form}>
      <div className="w-full h-full flex flex-col justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="login">
            {loading ? <LoadingSpinner /> : "Registrar"}
          </Button>
        </form>
      </div>
    </Form>
  );
}
