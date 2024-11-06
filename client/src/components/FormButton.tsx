import { cn } from "../utils/cn";

export function FormButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "w-full p-1.5 rounded bg-gray-800 text-white disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
