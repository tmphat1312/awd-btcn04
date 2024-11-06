export async function login(data: { email: string; password: string }) {
  const resp = await fetch(`${import.meta.env.VITE_BE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await resp.json();
  if (!resp.ok) {
    throw new Error(json.error);
  }

  return json.data;
}
