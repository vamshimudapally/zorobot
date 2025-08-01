import { z } from "zod"

export const agentsInsertSchema = z.object({
    name: z.string().min(1 , {message: "Name is Required"}),
    instructions: z.string().min(1 , {message: "Instructions are Required"}),

});

export const agentsUpdateSchema = agentsInsertSchema.extend({
    id:z.string().min(1 , { message: "Id is required"}),
});
