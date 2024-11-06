import { forwardRef } from "react";
import { cn } from "../utils/cn";
import { useFormFieldContext } from "./FormField";

export const Label = forwardRef<
  HTMLLabelElement,
  Omit<React.ComponentProps<"label">, "htmlFor">
>(({ children, className, ...props }, ref) => {
  const value = useFormFieldContext();

  if (!value) {
    throw new Error("Label must be used within a FormField");
  }

  return (
    <label
      className={cn("mb-4", className)}
      ref={ref}
      htmlFor={value.id}
      {...props}
    >
      {children}
    </label>
  );
});
