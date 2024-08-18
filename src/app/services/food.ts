import { FoodData } from "../interface/FoodData";
import { api } from "./api";

const URL = "/food";

export async function findAll(): Promise<FoodData[]> {
  const { data } = await api.get(URL);
  return data;
}

export async function findAllGrouped(): Promise<Map<string, FoodData[]>> {
  const { data } = await api.get(URL + "/types");
  const map = new Map(Object.entries(data)) as Map<string, FoodData[]>;
  return map;
}

export async function updateFood(food: FormData) {

  const {data} = await api.put(URL + "/" + food.get("id"), food, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
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
