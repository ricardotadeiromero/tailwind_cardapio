import { FoodData } from "./FoodData";

export interface OrderItem {
    id: number,
    food: FoodData,
    amount: number
}