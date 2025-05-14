import { TeacherPosition } from "@prisma/client";

export interface TeacherDto {
  id: number;
  name: string;
  position: TeacherPosition;
}
