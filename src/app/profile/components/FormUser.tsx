"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import { User } from "@/app/interface/User";
import { UserSchema } from "@/app/schema/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import SelectImage from "./SelectImage";
import { UserUploadSchema } from "@/app/schema/UploadUserSchema";
import { updateUserData } from "@/app/hooks/updateUser";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function FormUser() {
  const form = useForm<z.infer<typeof UserUploadSchema>>({
    resolver: zodResolver(UserUploadSchema),
  });
  const { toast } = useToast();
  const [img, setImg] = useState<string | null>(null);
  const { mutate: update } = updateUserData();
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setImg(user.image!);
      form.setValue("username", user?.username || "");
    }
  }, [form, user]);

  async function onSubmit(data: z.infer<typeof UserUploadSchema>) {
    const formData = new FormData();
    formData.append("id", user?.id!);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("newPassword", data?.newPassword || "");
    if (data.image) {
      formData.append("image", data.image);
    }
    if (confirmedPassword !== data.newPassword) {
      toast({
        title: "Ops! Parece que houve um problema.",
        description: "A nova senha está divergente.",
        variant: "destructive",
      });
      return;
    }
    update(formData);
    router.push("/");
  }

  return (
    <Form {...form}>
      <div className="w-full h-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          {img && (
            <div className="w-full mx-auto text-center">
              <img
                className="mx-auto rounded-full w-[150px] h-[150px]"
                src={img!}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem className="flex justify-between items-center">
                <FormControl>
                  <SelectImage
                    setImg={setImg}
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Nova Senha" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormItem>
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    value={confirmedPassword}
                    onChange={(e) => {
                      setConfirmedPassword(e.target.value);
                    }}
                    placeholder="Nova Senha"
                  />
                </FormControl>
              </FormItem>
            </div>
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </Form>
  );
}
