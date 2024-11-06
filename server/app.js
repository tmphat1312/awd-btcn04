import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { error } from "./middleware/error.js";
import { give } from "./middleware/give.js";
import { notFound } from "./middleware/not-found.js";
import { raise } from "./middleware/raise.js";

import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FE_URL || "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(morgan(process.env.NODE_ENV == "development" ? "dev" : "combined"));

app.use(give);
app.use(raise);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(notFound);
app.use(error);

export default app;
