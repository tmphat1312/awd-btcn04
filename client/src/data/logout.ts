export async function logout() {
  await fetch(`${import.meta.env.VITE_BE_URL}/auth/logout`, {
    method: "POST",
  });
}
