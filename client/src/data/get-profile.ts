import { TUser } from "../types";

export async function getProfile(): Promise<TUser> {
  const resp = await fetch(`${import.meta.env.VITE_BE_URL}/auth/me`);
  if (!resp.ok) throw new Error("Failed to fetch profile.");

  const result = await resp.json();
  return result.data;
}
