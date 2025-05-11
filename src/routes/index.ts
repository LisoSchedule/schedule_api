import { Router } from "express";

import { UserRouter } from "./user.route";

const router = Router();

router.use("/user", UserRouter);

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
