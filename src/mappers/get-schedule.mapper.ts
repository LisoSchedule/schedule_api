import { GetScheduleDto } from "../dtos/get-schedule.dto";
import { ScheduleType } from "../enums/schedule-type.enum";

export class GetScheduleMapper {
  toDto(params: any, query: any): GetScheduleDto {
    return {
      userId: params.userId,
      date: query.date ? new Date(query.date) : new Date(),
      type: (query.type as ScheduleType) ?? ScheduleType.TODAY,
    };
  }
}
