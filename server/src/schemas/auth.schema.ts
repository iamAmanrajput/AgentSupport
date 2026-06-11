import { z } from "zod";

export const registerAdminSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const createOperatorSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  token: z.string().trim().min(1, "Token is required"),
});
