import { cn } from "../utils/cn";

type MessageProps = {
  variant?: "error" | "success";
  children: React.ReactNode;
};

export function Message({ variant = "error", children }: MessageProps) {
  return (
    <p
      className={cn(
        "text-center mb-4",
        variant == "error" && "text-red-500",
        variant == "success" && "text-green-500"
      )}
      role="alert"
    >
      {children}
    </p>
  );
}
