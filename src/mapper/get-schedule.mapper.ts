import { GetScheduleDto } from "../dtos/get-schedule.dto";
import { ScheduleType } from "../enums/schedule-type.enum";

export class GetScheduleMapper {
  queryToDto(query: any): GetScheduleDto {
    return {
      chatId: BigInt(query.chatId),
      date: query.date ? new Date(query.date) : new Date(),
      type: query.type as ScheduleType,
    };
  }
}
