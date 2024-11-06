import { z } from "zod";

export const passwordValidator = z
  .string({
    message: "Password is required",
  })
  .min(8, {
    message: "Password must be at least 8 characters long",
  });
