import { createContext, useContext, useId } from "react";
import { cn } from "../utils/cn";

const FormFieldContext = createContext<{
  id: string;
}>({ id: "" });

// eslint-disable-next-line react-refresh/only-export-components
export const useFormFieldContext = () => {
  const value = useContext(FormFieldContext);

  if (!value) {
    throw new Error("useFormFieldContext must be used inside a FormField");
  }

  return value;
};

type FormFieldProps = {
  id: string;
} & React.ComponentProps<"div">;

export function FormField({
  id,
  children,
  className,
  ...props
}: FormFieldProps) {
  const idSuffix = useId();

  return (
    <div className={cn("mb-3.5", className)} {...props}>
      <FormFieldContext.Provider value={{ id: `${id}${idSuffix}` }}>
        {children}
      </FormFieldContext.Provider>
    </div>
  );
}
