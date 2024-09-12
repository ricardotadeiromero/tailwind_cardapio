
import z, { string } from 'zod';


export const ChangeStatusOrderSchema = z.object({
    status: z.string()
})