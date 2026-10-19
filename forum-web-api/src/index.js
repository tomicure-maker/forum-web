import express from "express";
import {PORT} from "./config.js";
import postsRoutes from "../routes/posts.routes.js";
import "./models/Post.js";

const app = express();

try {
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(postsRoutes);

await sequelize.sync();
console.log("Database synchronized successfully.");
} catch (error) {
  console.error("Error starting the server:", error);
}