import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createComment, listComments } from "../services/commentService.js";

const router = Router();

router.get("/posts/:postId/comments", async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isInteger(postId) || postId <= 0) return res.status(400).json({ message: "ID de publicación inválido." });
    res.json(await listComments(postId));
  } catch (error) { next(error); }
});

router.post("/posts/:postId/comments", requireAuth, async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isInteger(postId) || postId <= 0) return res.status(400).json({ message: "ID de publicación inválido." });
    res.status(201).json(await createComment({ postId, contenido: req.body.contenido, comentarioPadreId: req.body.comentarioPadreId }, req.user.id));
  } catch (error) { next(error); }
});

export default router;
