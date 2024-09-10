import { FoodType } from "./FoodType";

export interface FoodData {
  id?: string;
  title: string;
  image?: string | null;
  description: string;
  ingredients: string;
  type?: FoodType;
  price: number;
}
