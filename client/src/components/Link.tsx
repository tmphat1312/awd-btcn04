import { cn } from "../utils/cn";
import {
  NavLink as RRLink,
  NavLinkProps as RRLinkProps,
} from "react-router-dom";

export function Link({ className, ...props }: RRLinkProps) {
  return (
    <RRLink
      className={({ isActive }) => {
        return cn(
          "hover:underline underline-offset-2 px-1.5",
          isActive && "text-sky-700 bg-sky-100 rounded",
          className
        );
      }}
      {...props}
    />
  );
}
