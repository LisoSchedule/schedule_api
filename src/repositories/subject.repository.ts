import { Prisma, Subject } from "@prisma/client";
import prisma from "../db/data-sourse";

export class SubjectRepository {
  private readonly subjectRepository = prisma.subject;

  async getAllSubjects() {
    return await this.subjectRepository.findMany();
  }

  async getSubjectById(subjectId: number) {
    return await this.subjectRepository.findUnique({
      where: {
        id: subjectId,
      },
    });
  }

  async createSubject(subjectToCreate: Prisma.SubjectCreateInput): Promise<Subject> {
    return await this.subjectRepository.create({
      data: subjectToCreate,
    });
  }
}
