import createHttpError from "http-errors";

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

const { USER_NOT_FOUND } = errorConstant;

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
    const { userId, date = new Date(), type = ScheduleType.TODAY } = dto;

    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw createHttpError(USER_NOT_FOUND.statusCode, USER_NOT_FOUND.message);
    }

    const daysToCheck = this.scheduleDateCalculation.getScheduleDateRange(date, type);

    const allRecurrences = await this.recurrenceRepository.getAllRecurrences();

    const validRecurrences = this.lessonRecurrenceService.validateRecurrences(
      user,
      daysToCheck,
      allRecurrences,
    );

    const lessons = await this.lessonRepository.getLessonsByRecurrences(
      user.groupId,
      validRecurrences,
    );

    const recurrenceMap = this.lessonRecurrenceService.mapRecurrencesToLessons(validRecurrences);

    const metadata: ScheduleMetadataDto = {
      user: user.nickname ?? user.username ?? String(user.id),
      groupId: user.groupId,
      requestDate: date,
      type,
    };

    const lessonsResponseDto = this.lessonMapperService.generateLessonResponseDtos(
      lessons,
      recurrenceMap,
      daysToCheck,
    );

    return new ScheduleResponseDto(metadata, lessonsResponseDto);
  }
}
