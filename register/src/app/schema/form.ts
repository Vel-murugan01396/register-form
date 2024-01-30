import {z} from "zod";

export const taskSchema =z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Task must contain atleast 1 character").max(25),
    createdAt: z.date().optional(),
    updateAt: z.date().optional(),
    password: z
    .string()
    .min(
      1,
      "Contains at least one special character (e.g., !, @, #, $, %, etc.)"
    )
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
 
})
export type TaskSchema = z.infer<typeof taskSchema>;