import { LessonDto } from "./lesson.dto";

export interface LessonResponseDto {
  lesson: LessonDto & { lessonDate: Date };
}
