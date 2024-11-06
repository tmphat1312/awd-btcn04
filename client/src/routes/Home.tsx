import { useQuery, useQueryClient } from "@tanstack/react-query";

import { H1 } from "../components/H1";
import { H2 } from "../components/H2";
import { getUsers } from "../data/get-users";
import { User } from "../components/User";

export function HomeRoute() {
  const {
    error,
    data: users,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <Layout>
        <p>Loading users...</p>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <p className="text-red-500">{error.message}</p>
      </Layout>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Layout>
        <p>No users yet.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ul className="divide-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <User user={user} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  return (
    <section>
      <div className="mb-4">
        <H1>
          Home{" - "}
          <span className="font-medium">
            {user ? "You are logged in" : "You are a stranger"}
          </span>
        </H1>
        <p>This page shows created users.</p>
      </div>

      <section>
        <H2>Current Users</H2>
        {children}
      </section>
    </section>
  );
}
