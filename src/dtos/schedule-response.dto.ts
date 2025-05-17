import { LessonResponseDto } from "./lesson-response.dto";
import { ScheduleMetadataDto } from "./schedule-metadata.dto";

export class ScheduleResponseDto {
  metadata: ScheduleMetadataDto;
  lessons: LessonResponseDto[];

  constructor(metadata: ScheduleMetadataDto, lessons: LessonResponseDto[]) {
    this.metadata = metadata;
    this.lessons = lessons;
  }
}
