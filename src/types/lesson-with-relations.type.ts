import { Lesson, LessonRecurrence, SubjectType, TeacherPosition } from "@prisma/client";

export type LessonWithRelations = Lesson & {
  subject: { id: number; name: string; type: SubjectType };
  teacher: { id: number; name: string; position: TeacherPosition };
  audience: { id: number; name: string };

  recurrences: LessonRecurrence[];
};
