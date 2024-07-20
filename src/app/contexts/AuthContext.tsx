"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interface/User";
import { parseCookies } from "nookies";
import { SignInData } from "../interface/SignInData";
import { api } from "../services/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api.get("/auth/recover").then((response) => {
        console.log(response.data.user);
        setUser(response.data.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const response = await api.post("/auth/login", { email, password });
    setUser(response.data.user);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
