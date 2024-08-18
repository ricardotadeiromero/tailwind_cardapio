import z from "zod";

export const FoodSchema = z.object({
  title: z.string().min(4),
  image: z.instanceof(File).optional(),
  price: z.number(),
  type: z.string(),
  description: z.string(),
  ingredients: z.string(),
});
