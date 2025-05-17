import { ScheduleType } from "../enums/schedule-type.enum";

export interface GetScheduleDto {
  chatId: bigint;
  date: Date;
  type: ScheduleType;
}
