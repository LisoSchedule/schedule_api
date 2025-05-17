import { Lesson, LessonRecurrence } from "@prisma/client";

export type LessonRecurrenceWithLesson = LessonRecurrence & {
  lesson: Lesson;
};
