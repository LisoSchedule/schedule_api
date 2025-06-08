import { LessonRecurrence, Prisma } from "@prisma/client";
import prisma from "../db/data-sourse";

export class RecurrenceRepository {
  private readonly recurrenceRepository = prisma.lessonRecurrence;

  async getAllRecurrences() {
    return await this.recurrenceRepository.findMany();
  }

  async getRecurrenceById(recurrenceId: number) {
    return await this.recurrenceRepository.findUnique({
      where: {
        id: recurrenceId,
      },
    });
  }

  async getRecurrencesByLessonId(lessonId: number) {
    return await this.recurrenceRepository.findMany({
      where: {
        lessonId: lessonId,
      },
    });
  }

  async createRecurrence(
    recurrenceToCreate: Prisma.LessonRecurrenceCreateInput,
  ): Promise<LessonRecurrence> {
    return await this.recurrenceRepository.create({
      data: recurrenceToCreate,
    });
  }
}
