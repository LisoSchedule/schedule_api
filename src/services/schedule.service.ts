import { NotFound } from "http-errors";

import { GetScheduleDto } from "../dtos/get-schedule.dto";
import { UserRepository } from "../repositories/user.repository";
import { ScheduleType } from "../enums/schedule-type.enum";
import { ScheduleResponseDto } from "../dtos/schedule-response.dto";
import { ScheduleDateCalculation } from "../utils/schedule-date-calculation.util";
import { ScheduleMetadataDto } from "../dtos/schedule-metadata.dto";
import { LessonRecurrenceRepository } from "../repositories/lesson-recurrence.repository";
import { LessonRepository } from "../repositories/lesson.repository";
import { LessonRecurrenceService } from "./lesson-recurrence.service";
import { LessonMapperService } from "./lesson-mapper.service";
import errorConstant from "../constants/error.constant";

export class ScheduleService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly recurrenceRepository: LessonRecurrenceRepository = new LessonRecurrenceRepository(),
    private readonly lessonRepository: LessonRepository = new LessonRepository(),
    private readonly scheduleDateCalculation: ScheduleDateCalculation = new ScheduleDateCalculation(),
    private readonly lessonRecurrenceService: LessonRecurrenceService = new LessonRecurrenceService(),
    private readonly lessonMapperService: LessonMapperService = new LessonMapperService(),
  ) {}

  async getScheduleByParams(dto: GetScheduleDto): Promise<ScheduleResponseDto> {
    const { chatId, date = new Date(), type = ScheduleType.TODAY } = dto;

    const user = await this.userRepository.findUserByChatId(chatId);
    if (!user) {
      throw new NotFound(errorConstant.USER_NOT_FOUND);
    }
    console.log(`\n[ScheduleService]\tuser`, user);

    // ✅ 1. get date range
    const daysToCheck = this.scheduleDateCalculation.getScheduleDateRange(date, type);
    console.log(`\n[ScheduleService]\tdaysToCheck`, daysToCheck);

    // ✅ 2. get all recurrences
    const allRecurrences = await this.recurrenceRepository.getAllRecurrences();
    console.log(`\n[ScheduleService]\tallRecurrences`, allRecurrences);

    // ✅ 3. validate recurrences
    console.log("\n\n\n");
    const validRecurrences = this.lessonRecurrenceService.validateRecurrences(
      user,
      daysToCheck,
      allRecurrences,
    );
    console.log(`\n\n\n[ScheduleService]\tvalidRecurrences`, validRecurrences, "\n\n");

    // ✅ 4. retrieve lessons by recurrences
    const lessons = await this.lessonRepository.getLessonsByRecurrences(
      user.groupId,
      validRecurrences,
    );
    console.log(`\n[ScheduleService]\tlessons`, lessons);

    // ✅ 5. map recurrences to lessons
    const recurrenceMap = this.lessonRecurrenceService.mapRecurrencesToLessons(validRecurrences);

    const metadata: ScheduleMetadataDto = {
      user: user.nickname ?? user.username ?? String(user.id),
      groupId: user.groupId,
      requestDate: date,
      type,
    };

    // ✅ 6. generate and sort lesson DTOs
    const lessonsResponseDto = this.lessonMapperService.generateLessonResponseDtos(
      lessons,
      recurrenceMap,
      daysToCheck,
    );

    return new ScheduleResponseDto(metadata, lessonsResponseDto);
  }
}
