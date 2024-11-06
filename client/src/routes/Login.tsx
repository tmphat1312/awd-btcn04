import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FieldError } from "../components/FieldError";
import { Form } from "../components/Form";
import { FormButton } from "../components/FormButton";
import { FormField } from "../components/FormField";
import { H1 } from "../components/H1";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Link } from "../components/Link";
import { Section } from "../components/Section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../data/login";

type LoginFormSchema = {
  email: string;
  password: string;
};

export function LoginRoute() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: LoginFormSchema) =>
      login({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.user.username}`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/profile", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Section>
      <H1 className="text-center">Login to your account</H1>
      <Form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <FormField id="email">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@email.com"
            data-invalid={errors.email ? "" : undefined}
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

        <FormField id="password">
          <Label>Password</Label>
          <Input
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

        <div className="mb-3">
          <FormButton disabled={mutation.isPending}>Login</FormButton>
        </div>
        <p className="text-sm text-center">
          Don't have an account yet?{" "}
          <Link className="text-blue-700" to="/register">
            Create one now
          </Link>
        </p>
      </Form>
    </Section>
  );
}
