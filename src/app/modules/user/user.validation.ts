import { z } from "zod";

// Define the Zod schema
export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.string({ message: "Phone number is required" }),
    address: z.string({ message: "Address is required" }),
    role: z.enum(["user", "admin"], {
      message: "Role must be either user or admin",
    }),
  }),
});

export const userValidations = {
  createUserSchema,
};
