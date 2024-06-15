import z from "zod";

export const FoodSchema = z.object({
  title: z.string().min(4),
  image: z.string(),
  price: z.string().transform(val => parseInt(val, 10)),
});
