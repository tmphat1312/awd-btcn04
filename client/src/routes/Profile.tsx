import { useQueryClient } from "@tanstack/react-query";
import { H1 } from "../components/H1";
import { H2 } from "../components/H2";

export function ProfileRoute() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  return (
    <section>
      <H1>Hi, {user.username}</H1>
      <div>
        <H2>Here's your account information</H2>
        <ul className="my-2">
          <li>
            <span>Email: </span>
            <span className="italic text-lg">{user.email}</span>
          </li>
          <li>
            <span>Username: </span>
            <span className="italic text-lg">{user.username}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
