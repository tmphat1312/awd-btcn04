import { TUser } from "../types";

export async function getUsers(): Promise<TUser[]> {
  const resp = await fetch(`${import.meta.env.VITE_BE_URL}/users`);
  if (!resp.ok) throw new Error("Failed to fetch users.");

  const result = await resp.json();
  return result.data;
}
