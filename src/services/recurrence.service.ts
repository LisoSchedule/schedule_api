import createHttpError from "http-errors";

import { RecurrenceRepository } from "../repositories/recurrence.repository";
import { AddRecurrenceDto } from "../dtos/add-recurrence.dto";
import { Prisma } from "@prisma/client";
import errorConstant from "../constants/error.constant";

const { RECURRENCE_NOT_FOUND, BAD_REQUEST } = errorConstant;

export class RecurrenceService {
  constructor(
    private readonly recurrenceRepository: RecurrenceRepository = new RecurrenceRepository(),
  ) {}

  async getAllRecurrences() {
    return await this.recurrenceRepository.getAllRecurrences();
  }

  async getRecurrenceById(recurrenceId: number) {
    return await this.recurrenceRepository.getRecurrenceById(recurrenceId);
  }

  async getRecurrenceByIdOrThrow(recurrenceId: number) {
    const recurrence = await this.getRecurrenceById(recurrenceId);

    if (!recurrence) {
      throw createHttpError(RECURRENCE_NOT_FOUND.statusCode, RECURRENCE_NOT_FOUND.message);
    }

    return recurrence;
  }

  async createRecurrence(data: AddRecurrenceDto) {
    const { lessonId, startDate, endDate, repeatType, repeatValue } = data.body || data;

    const recurrenceToCreate: Prisma.LessonRecurrenceCreateInput = {
      lesson: { connect: { id: lessonId } },
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      repeatType,
      repeatValue,
    };

    const createdRecurrence = await this.recurrenceRepository.createRecurrence(recurrenceToCreate);

    if (!createdRecurrence) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdRecurrence;
  }
}
