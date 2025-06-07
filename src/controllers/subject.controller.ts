import { Request, Response } from "express";

import { SubjectService } from "../services/subject.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { AddSubjectDto } from "../dtos/add-subject.dto";
import successConstant from "../constants/success.constant";

const { SUBJECTS_FETCHED, SUBJECT_FETCHED, SUBJECT_CREATED } = successConstant;

export class SubjectController {
  constructor(private readonly subjectService: SubjectService = new SubjectService()) {}

  async getAllSubjects(_req: Request, res: Response) {
    const subjects = await this.subjectService.getAllSubjects();

    res
      .status(SUBJECTS_FETCHED.statusCode)
      .json(new SuccessResponseDto(subjects, SUBJECTS_FETCHED.message));
  }

  async getSubjectById(req: Request, res: Response) {
    const subjectId = Number(req.params["subjectId"]);

    const subject = await this.subjectService.getSubjectById(subjectId);

    res
      .status(SUBJECT_FETCHED.statusCode)
      .json(new SuccessResponseDto(subject, SUBJECT_FETCHED.message));
  }

  async createSubject(req: Request, res: Response) {
    const data: AddSubjectDto = {
      body: req.body,
    };

    const newSubject = await this.subjectService.createSubject(data);

    res
      .status(SUBJECT_CREATED.statusCode)
      .json(new SuccessResponseDto(newSubject, SUBJECT_CREATED.message));
  }
}
