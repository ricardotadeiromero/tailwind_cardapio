import { FoodType } from "../interface/FoodType";
import { api } from "./api";

const types = "/types";

export async function findAllType(): Promise<FoodType[]> {
  const { data } = await api.get(types);
  return data;
}

export async function createType(type: FoodType) {
  const { data } = await api.post(types, type);
  return data;
}

export async function updateType(type: FoodType) {
  await api.put(types + `/${type.id}`, type.name);
}

export async function deleteType(id: string) {
  await api.delete(types + `/${id}`);
}
