import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import postsRoutes from "../routes/posts.routes.js";
import authRoutes from "../routes/auth.routes.js";
import commentsRoutes from "../routes/comments.routes.js";
import tagsRoutes from "../routes/tags.routes.js";
import "../models/associations.js";
import { migrateLegacyPosts, sequelize } from "../db.js";
import { seedDefaultTags } from "../services/tagService.js";

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === "http://localhost:5173" || origin === "http://127.0.0.1:5173") {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});
app.use(express.json());
app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use(postsRoutes);
app.use(tagsRoutes);
app.use(authRoutes);
app.use(commentsRoutes);
app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.status || (error.name === "SequelizeUniqueConstraintError" ? 409 : 500);
  const message = status === 500 ? "Ocurrió un error interno." : error.message;
  res.status(status).json({ message });
});

try {
  await migrateLegacyPosts();
  await sequelize.sync();
  await seedDefaultTags();
  app.listen(PORT, () => console.log(`API disponible en http://localhost:${PORT}`));
} catch (error) {
  console.error("No se pudo iniciar la API:", error);
  process.exitCode = 1;
}
