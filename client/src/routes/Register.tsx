import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { FieldError } from "../components/FieldError";
import { Form } from "../components/Form";
import { FormButton } from "../components/FormButton";
import { FormField } from "../components/FormField";
import { H1 } from "../components/H1";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Section } from "../components/Section";
import { register as registerUser } from "../data/register";

type RegisterFormSchema = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export function RegisterRoute() {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: RegisterFormSchema) =>
      registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
      }),
    onSuccess: () => {
      toast.success("Account created successfully, Please login");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      navigate("/login", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Section>
      <H1 className="text-center">Register an account</H1>
      <Form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <FormField id="email">
          <Label>Email</Label>
          <Input
            data-invalid={errors.email ? "" : undefined}
            disabled={mutation.isPending}
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </FormField>

        <FormField id="username">
          <Label>Username</Label>
          <Input
            data-invalid={errors.username ? "" : undefined}
            disabled={mutation.isPending}
            type="text"
            placeholder="hiimcoco"
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters",
              },
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </FormField>

        <FormField id="password">
          <Label>Password</Label>
          <Input
            disabled={mutation.isPending}
            data-invalid={errors.password ? "" : undefined}
            type="password"
            placeholder="********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </FormField>

        <FormField id="confirm-password">
          <Label>Confirm Password</Label>
          <Input
            disabled={mutation.isPending}
            data-invalid={errors.confirmPassword ? "" : undefined}
            type="password"
            placeholder="********"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === "" ||
                value === getValues("password") ||
                "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </FormField>

        <div className="mb-3">
          <FormButton disabled={mutation.isPending}>Register</FormButton>
        </div>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-700" to="/login">
            Sign in
          </Link>
        </p>
      </Form>
    </Section>
  );
}
