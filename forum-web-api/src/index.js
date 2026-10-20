import express from "express";
import {PORT} from "./config.js";
import postsRoutes from "../routes/posts.routes.js";
import "../models/Post.js";
import { sequelize } from "../db.js";

const app = express();

try {
app.use(express.json());
app.use(postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

await sequelize.sync();

console.log("Database synchronized successfully.");

} catch (error) {
  console.error("Error starting the server:", error);
}