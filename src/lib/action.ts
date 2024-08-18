import { User } from "@/app/interface/User";
import { getAPIClient } from "@/app/services/axios";

export class Action {
  token: string;
  api: any;

  constructor(token: string) {
    this.token = token;
    this.getApi();
  }

  async verifyToken(): Promise<User | null> {
    try {
      const { data } = await this.api.get("/auth/recover");
      const user = data;
  
      return user;
    } catch (error) {
      console.log("Token verification error: ", error);
    }
  
    return null;
  }

  getApi(): void {
    this.api = getAPIClient(null, this.token);
  }
}
