import { RepeatType } from "@prisma/client";

export interface ClassRecurrenceDto {
  startDate: Date;
  endDate: Date;
  repeatType: RepeatType;
  repeatValue: number;
}
