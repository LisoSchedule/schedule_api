import { Router } from "express";

import { AudiencesRouter } from "./audiences.route";
import { GroupsRouter } from "./groups.route";
import { LessonsRouter } from "./lessons.route";
import { RecurrencesRouter } from "./recurrences.route";
import { ScheduleRouter } from "./schedule.route";
import { SubjectsRouter } from "./subjects.route";
import { TeachersRouter } from "./teachers.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/audiences", AudiencesRouter);

router.use("/groups", GroupsRouter);

router.use("/lessons", LessonsRouter);

router.use("/recurrences", RecurrencesRouter);

router.use("/schedule", ScheduleRouter);

router.use("/subjects", SubjectsRouter);

router.use("/teachers", TeachersRouter);

router.use("/users", UserRouter);

router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Schedule API bla bla bla" });
});

export default router;
