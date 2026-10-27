import { Router } from "express";
import { listTags } from "../services/tagService.js";

const router = Router();

router.get("/tags", async (_req, res, next) => {
  try {
    res.json(await listTags());
  } catch (error) {
    next(error);
  }
});

export default router;
