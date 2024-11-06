export async function register(data: {
  email: string;
  password: string;
  username: string;
}) {
  const resp = await fetch(`${import.meta.env.VITE_BE_URL}/auth/register`, {
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

  return json;
}
