import { Router } from "express";

import { UserRouter } from "./user.route";
import { ScheduleRouter } from "./schedule.route";
const router = Router();

router.use("/users", UserRouter);

router.use("/schedule", ScheduleRouter);

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
