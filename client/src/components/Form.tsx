import { forwardRef } from "react";
import { cn } from "../utils/cn";

export const Form = forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, children, ...props }, ref) => {
  return (
    <form
      {...props}
      className={cn("p-4 max-w-[44ch] mx-auto", className)}
      ref={ref}
    >
      {children}
    </form>
  );
});
