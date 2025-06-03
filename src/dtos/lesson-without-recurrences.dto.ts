import { AudienceDto } from "./audience.dto";
import { SubjectDto } from "./subject.dto";
import { TeacherDto } from "./teacher.dto";

export interface LessonWithoutRecurrencesDto {
  id: number;
  subject: SubjectDto;
  teacher: TeacherDto;
  audience: AudienceDto;
  startTime: Date;
  duration: number;
}
