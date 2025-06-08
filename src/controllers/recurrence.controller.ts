import { Request, Response } from "express";

import { RecurrenceService } from "../services/recurrence.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { AddRecurrenceDto } from "../dtos/add-recurrence.dto";
import successConstant from "../constants/success.constant";

const { RECURRENCES_FETCHED, RECURRENCE_FETCHED, RECURRENCE_CREATED } = successConstant;

export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService = new RecurrenceService()) {}

  async getAllRecurrences(_req: Request, res: Response) {
    const recurrences = await this.recurrenceService.getAllRecurrences();

    res
      .status(RECURRENCES_FETCHED.statusCode)
      .json(new SuccessResponseDto(recurrences, RECURRENCES_FETCHED.message));
  }

  async getRecurrenceById(req: Request, res: Response) {
    const recurrenceId = Number(req.params["recurrenceId"]);

    const recurrence = await this.recurrenceService.getTeacherByIdOrThrow(recurrenceId);

    res
      .status(RECURRENCE_FETCHED.statusCode)
      .json(new SuccessResponseDto(recurrence, RECURRENCE_FETCHED.message));
  }

  async createRecurrence(req: Request, res: Response) {
    const data: AddRecurrenceDto = {
      body: req.body,
    };

    const newRecurrence = await this.recurrenceService.createRecurrence(data);

    res
      .status(RECURRENCE_CREATED.statusCode)
      .json(new SuccessResponseDto(newRecurrence, RECURRENCE_CREATED.message));
  }
}
