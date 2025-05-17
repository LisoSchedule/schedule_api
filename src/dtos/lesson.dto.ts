import { LessonRecurrenceDto } from "./lesson-recurrence.dto";
import { SubjectDto } from "./subject.dto";
import { TeacherDto } from "./teacher.dto";
import { AudienceDto } from "./audience.dto";

export interface LessonDto {
  id: number;
  subject: SubjectDto;
  teacher: TeacherDto;
  audience: AudienceDto;
  startTime: Date;
  duration: number;
  recurrence: LessonRecurrenceDto;
}
