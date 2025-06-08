import createHttpError from "http-errors";

import { LessonRepository } from "../repositories/lesson.repository";
import { AddLessonDto } from "../dtos/add-lesson.dto";
import { Prisma } from "@prisma/client";
import errorConstant from "../constants/error.constant";

const { LESSON_NOT_FOUND, BAD_REQUEST } = errorConstant;

export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository = new LessonRepository()) {}

  async getAllLessons() {
    return await this.lessonRepository.getAllLessons();
  }

  async getLessonById(lessonId: number) {
    return await this.lessonRepository.getLessonById(lessonId);
  }

  async getLessonByIdOrThrow(lessonId: number) {
    const lesson = await this.getLessonById(lessonId);

    if (!lesson) {
      throw createHttpError(LESSON_NOT_FOUND.statusCode, LESSON_NOT_FOUND.message);
    }

    return lesson;
  }

  async createLesson(data: AddLessonDto) {
    const { subjectId, teacherId, audienceId, groupId, startTime, duration } = data.body || data;

    const lessonToCreate: Prisma.LessonCreateInput = {
      subject: { connect: { id: subjectId } },
      teacher: { connect: { id: teacherId } },
      audience: { connect: { id: audienceId } },
      group: { connect: { id: groupId } },
      startTime,
      duration,
    };

    const createdLesson = await this.lessonRepository.createLesson(lessonToCreate);

    if (!createdLesson) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdLesson;
  }
}
