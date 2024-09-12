import { FoodType } from "./FoodType";

export interface FoodData {
  id?: string;
  title: string;
  image: string;
  description: string;
  ingredients: string;
  type?: FoodType;
  price: number;
}
