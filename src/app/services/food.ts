import { FoodData } from "../interface/FoodData";
import { api } from "./api";

const URL = "/food";

export async function findAll(): Promise<FoodData[]> {
  const { data } = await api.get(URL);
  return data;
}

export async function updateFood(food: FoodData) {
  await api.put(URL + "/" + food.id, food);
}

export async function findFood(id: string): Promise<FoodData> {
  const { data } = await api.get(URL + "/" + id);
  return data;
}

export async function deleteFood(id: string) {
  await api.delete(URL + "/" + id);
}

export async function createFood(food: FoodData) {
  const { data } = await api.post(URL, food);
  return data;
}
