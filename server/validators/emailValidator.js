import z from "zod";

export const emailValidator = z
  .string({
    message: "Email is required",
  })
  .email("Invalid email");
