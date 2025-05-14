import { ClassRecurrenceDto } from "./class-recurrence.dto";
import { SubjectDto } from "./subject.dto";
import { TeacherDto } from "./teacher.dto";
import { AudienceDto } from "./audience.dto";

export interface ClassDto {
  id: number;
  subject: SubjectDto;
  teacher: TeacherDto;
  audience: AudienceDto;
  startTime: Date;
  duration: number;
  schedule: ClassRecurrenceDto[];
}
