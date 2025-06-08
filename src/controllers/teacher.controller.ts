import { Request, Response } from "express";

import { TeacherService } from "../services/teacher.service";
import { AddTeacherDto } from "../dtos/add-teacher.dto";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import successConstant from "../constants/success.constant";

const { TEACHERS_FETCHED, TEACHER_FETCHED, TEACHER_CREATED } = successConstant;

export class TeacherController {
  constructor(private readonly teacherService: TeacherService = new TeacherService()) {}

  async getAllTeachers(_req: Request, res: Response) {
    const teachers = await this.teacherService.getAllTeachers();

    res
      .status(TEACHERS_FETCHED.statusCode)
      .json(new SuccessResponseDto(teachers, TEACHERS_FETCHED.message));
  }

  async getTeacherById(req: Request, res: Response) {
    const teacherId = Number(req.params["teacherId"]);

    const teacher = await this.teacherService.getTeacherByIdOrThrow(teacherId);

    res
      .status(TEACHER_FETCHED.statusCode)
      .json(new SuccessResponseDto(teacher, TEACHER_FETCHED.message));
  }

  async createTeacher(req: Request, res: Response) {
    const data: AddTeacherDto = {
      body: req.body,
    };

    const newTeacher = await this.teacherService.createTeacher(data);

    res
      .status(TEACHER_CREATED.statusCode)
      .json(new SuccessResponseDto(newTeacher, TEACHER_CREATED.message));
  }
}
