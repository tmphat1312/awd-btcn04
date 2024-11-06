import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedLayout() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}
