import { DateDto } from "./date.dto";
import { LessonDto } from "./lesson.dto";

export interface LessonResponseDto {
  date: DateDto;
  lesson: LessonDto;
}
