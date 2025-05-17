import { LessonRecurrenceWithLesson } from "../types/lesson-recurrence-with-lesson.type";
import prisma from "../db/data-sourse";

export class LessonRecurrenceRepository {
  constructor(private readonly lessonRecurrenceRepository = prisma.lessonRecurrence) {}

  async getAllRecurrences(): Promise<LessonRecurrenceWithLesson[]> {
    return await this.lessonRecurrenceRepository.findMany({
      include: {
        lesson: true,
      },
    });
  }

  /**
   * @description
   * the idea is to get the date of the first week
   */
  async getFirstLessonDateByGroupId(groupId: number): Promise<Date> {
    const firstLesson = await this.lessonRecurrenceRepository.findFirstOrThrow({
      where: {
        lesson: {
          groupId,
        },
      },
      include: {
        lesson: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return firstLesson.startDate;
  }
}
