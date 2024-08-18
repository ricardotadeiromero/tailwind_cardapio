"use client";
import { LoginSchema } from "@/app/schema/LoginSchema";
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
import { PasswordInput } from "@/components/ui/password-input";

export default function FormLogin() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const { signIn, loading } = useContext(AuthContext);

  function onSubmit({ email, password }: z.infer<typeof LoginSchema>) {
    signIn({ email, password });
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
                  <PasswordInput
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="login">
            {loading ? <LoadingSpinner /> : "Login"}
          </Button>
        </form>
      </div>
    </Form>
  );
}
