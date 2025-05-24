import { LessonRecurrence } from "@prisma/client";

import { LessonWithRelations } from "../types/lesson-with-relations.type";
import { LessonToDtoMapper } from "../mappers/lesson-to-dto.mapper";
import { ScheduleDateCalculation } from "../utils/schedule-date-calculation.util";
import { LessonResponseDto } from "../dtos/lesson-response.dto";

export class LessonMapperService {
  constructor(
    private readonly lessonToDtoMapper: LessonToDtoMapper = new LessonToDtoMapper(),
    private readonly scheduleDateCalculation: ScheduleDateCalculation = new ScheduleDateCalculation(),
  ) {}

  /**
   * @description
   * Generates an array of lesson DTOs based on the lessons and their recurrences
   * @param lessons - Array of lessons with their relations
   * @param recurrenceMap - Map of lesson IDs to their recurrences
   * @param daysToCheck - Single date or array of dates to check
   * @returns Array of lesson DTOs sorted by date and time
   */
  generateLessonResponseDtos(
    lessons: LessonWithRelations[],
    recurrenceMap: Map<number, LessonRecurrence[]>,
    daysToCheck: Date | Date[],
  ): LessonResponseDto[] {
    const result: LessonResponseDto[] = [];

    for (const lesson of lessons) {
      const recurrences = recurrenceMap.get(lesson.id);
      if (!recurrences) continue;

      for (const recurrence of recurrences) {
        const daysArray = Array.isArray(daysToCheck) ? daysToCheck : [daysToCheck];
        for (const day of daysArray) {
          if (this.scheduleDateCalculation.isDateInLessonRecurrence(day, recurrence)) {
            result.push(this.lessonToDtoMapper.mapToDto(lesson, recurrence, day));
            break;
          }
        }
      }
    }

    return this.sortLessonsByDateTime(result);
  }

  /**
   * @description
   * Sorts lessons by their date and time
   * First sorts by the actual lesson date, then by start time if dates are equal
   * @param lessons - Array of lesson DTOs to sort
   * @returns Sorted array of lesson DTOs
   */
  private sortLessonsByDateTime(lessons: LessonResponseDto[]): LessonResponseDto[] {
    return lessons.sort((a, b) => {
      const dateCompare = a.lesson.lessonDate.getTime() - b.lesson.lessonDate.getTime();
      if (dateCompare === 0) {
        return new Date(a.lesson.startTime).getTime() - new Date(b.lesson.startTime).getTime();
      }
      return dateCompare;
    });
  }
}
