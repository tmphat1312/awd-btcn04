export function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-red-500 mt-1.5" role="alert">
      {children}
    </p>
  );
}
