import { LessonRecurrence, User } from "@prisma/client";

import { LessonRecurrenceWithLesson } from "../types/lesson-recurrence-with-lesson.type";
import { ScheduleDateCalculation } from "../utils/schedule-date-calculation.util";

export class LessonRecurrenceService {
  constructor(
    private readonly scheduleDateCalculation: ScheduleDateCalculation = new ScheduleDateCalculation(),
  ) {}

  /**
   * @description
   * Filters recurrences based on user's group
   * and validates them against the specified dates
   * @param user - The user requesting the schedule
   * @param daysToCheck - Single date or array of dates to validate against
   * @param recurrences - Array of all lesson recurrences with their lesson data
   * @returns Array of valid recurrences that match the user's group and specified dates
   */
  validateRecurrences(
    user: User,
    daysToCheck: Date | Date[],
    recurrences: LessonRecurrenceWithLesson[],
  ): LessonRecurrence[] {
    return recurrences.filter((recurrence) => {
      if (recurrence.lesson.groupId !== user.groupId) return false;

      if (Array.isArray(daysToCheck)) {
        return this.scheduleDateCalculation.isDateRangeInLessonRecurrence(daysToCheck, recurrence);
      } else {
        return this.scheduleDateCalculation.isDateInLessonRecurrence(daysToCheck, recurrence);
      }
    });
  }

  /**
   * @description Creates a map of lesson IDs to their corresponding recurrences
   * @param recurrences - Array of lesson recurrences
   * @returns Map where key is lessonId and value is array of recurrences for that lesson
   */
  mapRecurrencesToLessons(recurrences: LessonRecurrence[]): Map<number, LessonRecurrence[]> {
    const recurrenceMap = new Map<number, LessonRecurrence[]>();

    for (const recurrence of recurrences) {
      const existingRecurrences = recurrenceMap.get(recurrence.lessonId) || [];
      existingRecurrences.push(recurrence);
      recurrenceMap.set(recurrence.lessonId, existingRecurrences);
    }

    return recurrenceMap;
  }
}
