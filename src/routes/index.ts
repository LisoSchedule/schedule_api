import { Router } from "express";

const router = Router();

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "API is up to use!" });
});

export default router;
