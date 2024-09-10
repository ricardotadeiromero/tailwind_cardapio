import { OrderItem } from "../interface/OrderItem";
import { CreateOrderItemDTO } from "./CreateOrderItemDTO";

export interface CreateOrderDTO {
  items: CreateOrderItemDTO[];
  client: string;
}
