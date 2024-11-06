import { TUser } from "../types";

type UserProps = {
  user: TUser;
};

export function User({ user }: UserProps) {
  return (
    <article className="py-1">
      <p className="font-mono">
        {user.email} | {user.username}
      </p>
      <p className="text-sm italic">
        <span>Created at </span>
        <time>{new Date(user.createdAt).toLocaleString()}</time>
      </p>
    </article>
  );
}
