import createHttpError from "http-errors";

import { SubjectRepository } from "../repositories/subject.repository";
import { AddSubjectDto } from "../dtos/add-subject.dto";
import { Prisma } from "@prisma/client";
import errorConstant from "../constants/error.constant";

const { SUBJECT_NOT_FOUND, BAD_REQUEST } = errorConstant;

export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository = new SubjectRepository()) {}

  async getAllSubjects() {
    return await this.subjectRepository.getAllSubjects();
  }

  async getSubjectById(subjectId: number) {
    return await this.subjectRepository.getSubjectById(subjectId);
  }

  async getTeacherByIdOrThrow(subjectId: number) {
    const subject = await this.getSubjectById(subjectId);

    if (!subject) {
      throw createHttpError(SUBJECT_NOT_FOUND.statusCode, SUBJECT_NOT_FOUND.message);
    }

    return subject;
  }

  async createSubject(data: AddSubjectDto) {
    const { name, type } = data.body || data;

    const subjectToCreate: Prisma.SubjectCreateInput = {
      name,
      type,
    };

    const createdTeacher = await this.subjectRepository.createSubject(subjectToCreate);

    if (!createdTeacher) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdTeacher;
  }
}
