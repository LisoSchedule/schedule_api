import { z as zod } from "zod";
import { ScheduleType } from "../enums/schedule-type.enum";

export const GetScheduleSchema = zod.object({
  query: zod.object({
    chatId: zod.coerce.number(),
    date: zod.coerce.date().optional(),
    type: zod.nativeEnum(ScheduleType).optional(),
  }),
});
