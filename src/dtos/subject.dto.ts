import { SubjectType } from "@prisma/client";

export interface SubjectDto {
  id: number;
  name: string;
  type: SubjectType;
}
