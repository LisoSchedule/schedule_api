import {
  differenceInDays,
  differenceInWeeks,
  isBefore,
  isAfter,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { LessonRecurrence, RepeatType } from "@prisma/client";
import { ScheduleType } from "../enums/schedule-type.enum";
export class ScheduleDateCalculation {
  /**
   * @description
   * Check if the provided date fits the recurrence rule
   */
  static isDateInLessonRecurrence(date: Date, recurrence: LessonRecurrence): boolean {
    const { startDate, endDate, repeatType, repeatValue } = recurrence;

    if (isBefore(date, startDate) || isAfter(date, endDate)) return false;

    switch (repeatType) {
      case RepeatType.Daily: {
        const dayDifference = differenceInDays(date, startDate);
        return dayDifference % repeatValue === 0;
      }
      case RepeatType.Weekly: {
        const weekDifference = differenceInWeeks(date, startDate);
        return weekDifference % repeatValue === 0;
      }
      case RepeatType.Monthly: {
        const monthDifference =
          (date.getFullYear() - startDate.getFullYear()) * 12 +
          (date.getMonth() - startDate.getMonth());
        return monthDifference % repeatValue === 0;
      }
      default:
        return false;
    }
  }

  /**
   * @description
   * Check if the provided date range fits the recurrence rule
   */
  static isDateRangeInLessonRecurrence(
    rangeStart: Date,
    rangeEnd: Date,
    recurrence: LessonRecurrence,
  ): boolean {
    const { startDate, endDate } = recurrence;

    if (isAfter(rangeStart, endDate) || isBefore(rangeEnd, startDate)) return false;

    const days = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

    return days.some((day) => this.isDateInLessonRecurrence(day, recurrence));
  }
}
