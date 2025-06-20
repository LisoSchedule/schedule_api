import { Prisma, Teacher } from "@prisma/client";
import prisma from "../db/data-sourse";

export class TeacherRepository {
  private readonly teacherRepository = prisma.teacher;

  async getAllTeachers() {
    return await this.teacherRepository.findMany();
  }

  async getTeacherById(teacherId: number) {
    return await this.teacherRepository.findUnique({
      where: {
        id: teacherId,
      },
    });
  }

  async createTeacher(teacherToCreate: Prisma.TeacherCreateInput): Promise<Teacher> {
    return await this.teacherRepository.create({
      data: teacherToCreate,
    });
  }
}
