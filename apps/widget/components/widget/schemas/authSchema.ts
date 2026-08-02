import { z } from "zod";

export const visitorFormSchema = z.object({
  name: z.string().min(1, "Name is required").trim().toLowerCase(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
});

export type visitorFormSchemaType = z.infer<typeof visitorFormSchema>;
