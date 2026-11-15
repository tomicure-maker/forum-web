import { Router } from "express";
import { createPost, deletePost, getPost, listPosts, updatePost } from "../services/postService.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/posts", async (_req, res, next) => {
  try { res.json(await listPosts()); } catch (error) { next(error); }
});

router.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await getPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "No se encontró la publicación." });
    res.json(post);
  } catch (error) { next(error); }
});

router.post("/posts", requireAuth, async (req, res, next) => {
  try { res.status(201).json(await createPost(req.body, req.user.id)); } catch (error) { next(error); }
});

router.patch("/posts/:id", requireAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (id <= 0) {
      return res.status(400).json({ message: "ID de publicación inválido." });
    }

    res.json(await updatePost(id, req.body || {}, req.user));
  } catch (error) {
    next(error);
  }
});

router.delete("/posts/:id", requireAuth, async (req, res, next) => {
  try {
    await deletePost(Number(req.params.id), req.user);
    res.status(204).end();
  } catch (error) { next(error); }
});

export default router;
