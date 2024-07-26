import { getAPIClient } from "@/app/services/axios";

export class Action {
  token: string;
  api: any;

  constructor(token: string) {
    this.token = token;
    this.getApi();
  }

  async verifyToken(): Promise<Boolean> {
    try {
      const response = await this.api.get("/auth/recover");
      return true;
    } catch (error) {
      return false;
    }
  }

  getApi(): void {
    this.api = getAPIClient(null, this.token);
  }
}
