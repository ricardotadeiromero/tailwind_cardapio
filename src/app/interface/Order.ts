import { FoodData } from "./FoodData";
import { OrderItem } from "./OrderItem";

import { User } from "./User";

export enum Status {
  ACTIVE = "ACTIVE",
  ONGOING = "ONGOING",
  DONE = "DONE",
}

export interface Order {
  id?: string;
  amount: number;
  items: OrderItem[];
  client: User;
  status?: Status;
}
