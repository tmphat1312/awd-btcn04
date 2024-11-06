import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import { Container } from "../components/Container";
import { getProfile } from "../data/get-profile";
import { Loading } from "./Loading";
import { NavBar } from "./NavBar";
import { ProtectedNavBar } from "./ProtectedNavBar";

export function MainLayout() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    retry: 0,
    initialData: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (user) localStorage.setItem("user", JSON.stringify(user));

  return (
    <Container>
      {user ? <ProtectedNavBar /> : <NavBar />}
      <main className="max-w-lg mx-auto">
        <Outlet />
      </main>
    </Container>
  );
}
