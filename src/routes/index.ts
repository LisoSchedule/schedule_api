import { Router } from "express";

const router = Router();

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
