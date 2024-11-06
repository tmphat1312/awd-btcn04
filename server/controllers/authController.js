import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { client } from "../db/client.js";
import { emailValidator } from "../validators/emailValidator.js";
import { passwordValidator } from "../validators/passwordValidator.js";
import { usernameValidator } from "../validators/usernameValidator.js";
import { createOne as createUser } from "./userController.js";

export async function login(req, res) {
  const validated = z
    .object({
      email: emailValidator,
      password: passwordValidator,
    })
    .safeParse(req.body);

  if (!validated.success) {
    return res.badRequest(validated.error);
  }

  const result = await client.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [req.body.email],
  });
  const user = result.rows[0];

  if (!user) {
    return res.badRequest({
      message: "Email not found",
    });
  }

  const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordMatch) {
    return res.badRequest({
      message: "Incorrect password",
    });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  res.give({
    access_token: accessToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  });
}

export async function register(req, res) {
  const validated = z
    .object({
      email: emailValidator,
      username: usernameValidator,
      password: passwordValidator,
    })
    .safeParse(req.body);

  if (!validated.success) {
    return res.badRequest(validated.error);
  }

  await createUser(req, res);
}

export function logout(req, res) {
  res.noContent("Logged out");
}

export async function protect(req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.cookies.access_token
  ) {
    return res.unauthorized({
      message: "You are not logged in! Please log in to get access.",
    });
  }

  try {
    const token =
      req.cookies.access_token || req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const result = await client.execute({
      sql: "SELECT email, username, id, created_at AS createdAt FROM users WHERE id = ?",
      args: [decoded.id],
    });
    const user = result.rows[0];

    if (!user) {
      return res.unauthorized({
        message: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    let message = error.message.includes("expired")
      ? "Token expired"
      : "Invalid token";

    return res.unauthorized({
      message,
    });
  }
}

export async function me(req, res) {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() - 1000),
  });
  res.give({
    user: req.user,
  });
}
