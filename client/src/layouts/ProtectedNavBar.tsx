import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Link } from "../components/Link";
import { logout } from "../data/logout";

export function ProtectedNavBar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
    },
  });

  return (
    <aside className="bg-gray-100 w-fit py-2.5 px-3.5 mx-auto rounded-lg">
      <nav className="flex justify-center gap-2.5">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <button
          disabled={logoutMutation.isPending}
          className="px-1.5 hover:underline underline-offset-2"
          onClick={() => logoutMutation.mutate()}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
