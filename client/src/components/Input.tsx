import { forwardRef } from "react";
import { useFormFieldContext } from "./FormField";
import { cn } from "../utils/cn";

export const Input = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "id">
>(({ className, ...props }, ref) => {
  const { id } = useFormFieldContext();

  return (
    <input
      className={cn(
        className,
        "border-2 rounded px-2 py-1 w-full",
        "data-[invalid]:border-red-500 data-[invalid]:outline-red-700",
        "disabled:bg-gray-200 disabled:cursor-not-allowed"
      )}
      ref={ref}
      id={id}
      {...props}
    />
  );
});
