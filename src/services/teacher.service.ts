import createHttpError from "http-errors";

import { TeacherRepository } from "../repositories/teacher.repository";
import errorConstant from "../constants/error.constant";

const { TEACHER_NOT_FOUND } = errorConstant;

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
}
