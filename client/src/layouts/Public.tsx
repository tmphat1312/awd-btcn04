import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

export function PublicLayout() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  if (user) {
    return <Navigate to="/profile" replace={true} />;
  }

  return <Outlet />;
}
