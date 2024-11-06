import { client } from "../db/client.js";
import { httpCodes } from "../constants/httpCodes.js";
import bcrypt from "bcrypt";

export async function getAll(req, res) {
  const result = await client.execute({
    sql: "SELECT id, email, username, created_at as createdAt FROM users ORDER BY created_at DESC",
    args: [],
  });
  const users = result.rows;
  res.give(users);
}

export async function getOne(req, res) {
  const { id } = req.params;
  const result = await client.execute({
    sql: "SELECT username, email, created_at as createdAt FROM users WHERE id = ?",
    args: [id],
  });
  const user = result.rows[0];
  res.give(user);
}

export async function createOne(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const result = await client.execute({
      sql: "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?) RETURNING id, username, email, created_at AS createdAt",
      args: [username, email, hashedPassword, new Date()],
    });
    const user = result.rows[0];
    res.created({ user }, "User created");
  } catch (error) {
    const message = error.message.includes("UNIQUE")
      ? `${error.message.split(".").at(-1).trim()} already exists`
      : error.message;

    res.badRequest({ message });
  }
}

export function updateOne(req, res) {
  res.send("Update user");
}

export function removeOne(req, res) {
  res.send("Remove user");
}
