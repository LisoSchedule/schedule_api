import { GroupDto } from "../dtos/group.dto";
import { LessonWithoutRecurrencesDto } from "../dtos/lesson-without-recurrences.dto";
import { User } from "@prisma/client";

export type GroupWithRelations = GroupDto & {
  users: User[];
  lessons: LessonWithoutRecurrencesDto[];
};
