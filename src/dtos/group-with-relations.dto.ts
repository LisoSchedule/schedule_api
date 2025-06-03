import { CurrentUserDto } from "./current-user.dto";
import { GroupDto } from "./group.dto";
import { LessonWithoutRecurrencesDto } from "./lesson-without-recurrences.dto";

export interface GroupWithRelationsDto extends GroupDto {
  users: CurrentUserDto[];
  lessons: LessonWithoutRecurrencesDto[];
}
