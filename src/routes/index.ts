import { Router } from "express";

import { GroupRouter } from "./ groups.route";
import { ScheduleRouter } from "./schedule.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/groups", GroupRouter);

router.use("/schedule", ScheduleRouter);

router.use("/users", UserRouter);

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
