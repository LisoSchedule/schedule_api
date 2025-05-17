import { ScheduleType } from "../enums/schedule-type.enum";

export interface ScheduleMetadataDto {
  user: string;
  groupId: number;
  requestDate: Date;
  type: ScheduleType;
}
