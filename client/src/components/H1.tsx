import { cn } from "../utils/cn";

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn("text-3xl mb-4 font-bold", className)} {...props} />;
}
