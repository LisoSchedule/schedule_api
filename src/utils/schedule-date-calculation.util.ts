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
  isDateInLessonRecurrence(date: Date, recurrence: LessonRecurrence): boolean {
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
  isDateRangeInLessonRecurrence(dates: Date[], recurrence: LessonRecurrence): boolean {
    const { startDate, endDate } = recurrence;

    return dates.some((day) => {
      if (isBefore(day, startDate) || isAfter(day, endDate)) return false;
      return this.isDateInLessonRecurrence(day, recurrence);
    });
  }

  /**
   * @description
   * Return date range for retrieving schedule
   * based on the provided date and passed schedule type
   *
   * @param date - date to calculate the range for.
   * @param type - schedule type (today, tomorrow, or week).
   * - today: just return date
   * - tomorrow: passed date + 1 day
   * - week: return date range from start of week to end of week
   */
  getScheduleDateRange(date: Date, type: ScheduleType): Date[] | Date {
    switch (type) {
      case ScheduleType.TOMORROW:
        return addDays(date, 1);
      case ScheduleType.TODAY:
        return date;
      case ScheduleType.WEEK:
        return eachDayOfInterval({
          start: startOfWeek(date, { weekStartsOn: 1 }),
          end: endOfWeek(date, { weekStartsOn: 1 }),
        });
      default:
        return date;
    }
  }
}
