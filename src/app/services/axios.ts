import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any, token2?: string) {
  const { token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  if (token2) {
    api.defaults.headers["Authorization"] = `Bearer ${token2}`;
  }

  return api;
}
