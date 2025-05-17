import { LessonRecurrence } from "@prisma/client";
import { LessonWithRelations } from "../types/lesson-with-relations.type";
import prisma from "../db/data-sourse";

export class LessonRepository {
  private readonly lessonRepository = prisma.lesson;

  /**
   * @description
   * Fetches lessons by their recurrences for a specific group.
   * @returns array of lessons with their relations
   */
  async getLessonsByRecurrences(
    groupId: number,
    recurrences: LessonRecurrence[],
  ): Promise<LessonWithRelations[]> {
    const lessonIds = recurrences.map((r) => r.lessonId);

    const lessons = await this.lessonRepository.findMany({
      where: {
        id: { in: lessonIds },
        groupId,
      },
      include: {
        subject: true,
        teacher: true,
        audience: true,
        recurrences: true,
      },
    });

    return lessons;
  }
}
