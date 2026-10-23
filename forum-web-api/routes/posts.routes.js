import {Router} from "express";
import Post from "../models/Post.js";

const router = Router();

router.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.get("/posts/:id", async (req, res) => {
  const {id} = req.params;
  const post = await Post.findByPk(id);
  res.json(post);
});

router.post("/posts", async (req, res) => {
  const { titulo, contenido, autor } = req.body;
  if (!titulo || !contenido) {
    return res.status(400).send({
      message: "El título y el contenido son obligatorios"
    })
  }
  const post = await Post.create({ titulo, contenido, autor });
  res.json(post);
});

router.delete("/posts/:id", async (req, res) => {
  const {id} = req.params;
  const post = await Post.findByPk(id);
  await post.destroy();
  res.send(`Deleting post ${id}`);
});

export default router;