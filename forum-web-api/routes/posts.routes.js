import {Router} from "express";

const router = Router();

router.get("/posts", (req, res) => {
  res.send("Hello World");
});

router.get("/posts/:id", (req, res) => {
  const {id} = req.params;
  res.send(`Post ${id}`);
});

router.post("/posts", (req, res) => {
  res.send("Creating a post");
});

router.put("/posts/:id", (req, res) => {
  const {id} = req.params;
  res.send(`Updating post ${id}`);
});

router.delete("/posts/:id", (req, res) => {
  const {id} = req.params;
  res.send(`Deleting post ${id}`);
});


export default router;