import { Router } from "express";
import { createToken, requireAuth } from "../middleware/authMiddleware.js";
import { publicUser, registerUser, verifyCredentials } from "../services/authService.js";

const router = Router();

router.post("/auth/register", async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user: publicUser(user), token: createToken(user) });
  } catch (error) { next(error); }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const user = await verifyCredentials(req.body);
    res.json({ user: publicUser(user), token: createToken(user) });
  } catch (error) { next(error); }
});

router.get("/auth/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

export default router;
