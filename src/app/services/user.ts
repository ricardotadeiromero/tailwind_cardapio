import { User } from "../interface/User";
import { api } from "./api";

export async function updateUser(user: FormData): Promise<any> {
  const { data } = await api.put("/auth", user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function recover(): Promise<User> {
  const { data } = await api.get("/auth/recover");
  return data;
}
