import z from "zod";


export const UserUploadSchema = z.object({
    username: z.string(),
    password: z.string(),
    newPassword: z.string().optional(),
    image: z.instanceof(File).optional()
})