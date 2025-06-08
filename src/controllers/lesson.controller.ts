import { Request, Response } from "express";

import { LessonService } from "../services/lesson.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { AddLessonDto } from "../dtos/add-lesson.dto";
import successConstant from "../constants/success.constant";

const { LESSONS_FETCHED, LESSON_FETCHED, LESSON_CREATED } = successConstant;

export class LessonController {
  constructor(private readonly lessonService: LessonService = new LessonService()) {}

  async getAllLessons(_req: Request, res: Response) {
    const lessons = await this.lessonService.getAllLessons();

    res
      .status(LESSONS_FETCHED.statusCode)
      .json(new SuccessResponseDto(lessons, LESSONS_FETCHED.message));
  }

  async getLessonById(req: Request, res: Response) {
    const lessonId = Number(req.params["lessonId"]);

    const lesson = await this.lessonService.getLessonByIdOrThrow(lessonId);

    res
      .status(LESSON_FETCHED.statusCode)
      .json(new SuccessResponseDto(lesson, LESSON_FETCHED.message));
  }

  async createLesson(req: Request, res: Response) {
    const data: AddLessonDto = {
      body: req.body,
    };

    const newLesson = await this.lessonService.createLesson(data);

    res
      .status(LESSON_CREATED.statusCode)
      .json(new SuccessResponseDto(newLesson, LESSON_CREATED.message));
  }
}
