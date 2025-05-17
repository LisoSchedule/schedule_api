import { RepeatType } from "@prisma/client";

export interface LessonRecurrenceDto {
  startDate: Date;
  endDate: Date;
  repeatType: RepeatType;
  repeatValue: number;
}
