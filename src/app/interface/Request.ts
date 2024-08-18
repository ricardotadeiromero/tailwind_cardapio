import { FoodData } from "./FoodData";

export interface Request {
    id: number,
    food: FoodData,
    amount: number
}