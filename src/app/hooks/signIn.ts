import axios from "axios";
import { User } from "../interface/User";

const API_URL = "http://localhost:8080/auth";

export async function signIn(email: string, password: string): Promise<User> {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );
  console.log(response.data);

  if (!response.data) {
    throw new Error("Login failed");
  }

  return response.data.token;
}
