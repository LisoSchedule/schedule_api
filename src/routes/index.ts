import { Router } from "express";

import { GroupRouter } from "./ groups.route";
import { ScheduleRouter } from "./schedule.route";
import { SubjectsRouter } from "./subjects.route";
import { TeachersRouter } from "./teachers.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/groups", GroupRouter);

router.use("/schedule", ScheduleRouter);

router.use("/subjects", SubjectsRouter);

router.use("/teachers", TeachersRouter);

router.use("/users", UserRouter);

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
