import { LessonRecurrence } from "@prisma/client";
import { LessonWithRelations } from "../types/lesson-with-relations.type";
import { LessonResponseDto } from "../dtos/lesson-response.dto";

export class LessonToDtoMapper {
  mapToDto(
    lesson: LessonWithRelations,
    recurrence: LessonRecurrence,
    lessonDate: Date,
  ): LessonResponseDto {
    return {
      lesson: {
        id: lesson.id,
        lessonDate: lessonDate,
        subject: {
          id: lesson.subject.id,
          name: lesson.subject.name,
          type: lesson.subject.type,
        },
        teacher: {
          id: lesson.teacher.id,
          name: lesson.teacher.name,
          position: lesson.teacher.position,
        },
        audience: {
          id: lesson.audience.id,
          name: lesson.audience.name,
        },
        startTime: lesson.startTime,
        duration: lesson.duration,
        recurrence: {
          startDate: recurrence.startDate,
          endDate: recurrence.endDate,
          repeatType: recurrence.repeatType,
          repeatValue: recurrence.repeatValue,
        },
      },
    };
  }
}
