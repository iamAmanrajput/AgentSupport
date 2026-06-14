import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is Required")
    .max(20, "Name must be less than 20 characters"),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signInSchema = z.object({
  email: z.string().toLowerCase().email("Invalid email address"),
  role: z.enum(["ADMIN", "OPERATOR"]),
  password: z.string().min(1, "Password is Required"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
