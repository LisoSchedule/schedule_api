import { ScheduleType } from "../enums/schedule-type.enum";

export interface GetScheduleDto {
  userId: number;
  date: Date;
  type: ScheduleType;
}
