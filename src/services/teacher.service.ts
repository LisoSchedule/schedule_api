import createHttpError from "http-errors";

import { TeacherRepository } from "../repositories/teacher.repository";
import { AddTeacherDto } from "../dtos/add-teacher.dto";
import { Prisma } from "@prisma/client";
import errorConstant from "../constants/error.constant";

const { TEACHER_NOT_FOUND, BAD_REQUEST } = errorConstant;

export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository = new TeacherRepository()) {}

  async getAllTeachers() {
    return await this.teacherRepository.getAllTeachers();
  }

  async getTeacherById(teacherId: number) {
    return await this.teacherRepository.getTeacherById(teacherId);
  }

  async getTeacherByIdOrThrow(teacherId: number) {
    const teacher = await this.getTeacherById(teacherId);

    if (!teacher) {
      throw createHttpError(TEACHER_NOT_FOUND.statusCode, TEACHER_NOT_FOUND.message);
    }

    return teacher;
  }

  async createTeacher(data: AddTeacherDto) {
    const { name, position } = data.body || data;

    const teacherToCreate: Prisma.TeacherCreateInput = {
      name,
      position,
    };

    const createdTeacher = await this.teacherRepository.createTeacher(teacherToCreate);

    if (!createdTeacher) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdTeacher;
  }
}
