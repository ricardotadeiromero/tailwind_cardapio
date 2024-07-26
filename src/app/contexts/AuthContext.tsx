"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interface/User";
import { destroyCookie, parseCookies } from "nookies";
import { SignInData } from "../interface/SignInData";
import { api } from "../services/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import UserNotFound from "../components/UserNotFound";
import { useToast } from "@/components/ui/use-toast";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void | ReactNode>;
  signOut: () => Promise<void | ReactNode>
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api
        .get("/auth/recover")
        .then((response) => {
          const responseUser = response.data.user;
          const filteredUser: User = {
            id: responseUser.id,
            email: responseUser.email,
            username: responseUser.username,
          };
          setUser(filteredUser);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const responseUser = response.data.user;
      const filteredUser: User = {
        id: responseUser.id,
        email: responseUser.email,
        username: responseUser.username,
      };
      setUser(filteredUser);
      toast({
        title: "Logado com sucesso!",
        description: `Seja bem-vindo ${filteredUser.username}!`,
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Algo está errado!",
        description: "Usuário ou senha inválidos...",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  async function signOut() {
    destroyCookie(undefined, "token");
    setUser(null);
    toast({
      description: "Usuário deslogado com sucesso!",
    });
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
