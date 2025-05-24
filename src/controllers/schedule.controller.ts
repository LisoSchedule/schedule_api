import { Request, Response } from "express";

import { ScheduleService } from "../services/schedule.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { GetScheduleDto } from "../dtos/get-schedule.dto";
import { GetScheduleMapper } from "../mappers/get-schedule.mapper";
import successConstant from "../constants/success.constant";

export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService = new ScheduleService(),
    private readonly getScheduleMapper: GetScheduleMapper = new GetScheduleMapper(),
  ) {}

  async getScheduleByParams(_req: Request, res: Response) {
    const getScheduleDto: GetScheduleDto = this.getScheduleMapper.toDto(
      res.locals["validated"].params,
      res.locals["validated"].query,
    );

    const scheduleData = await this.scheduleService.getScheduleByParams(getScheduleDto);

    res.status(200).json(
      new SuccessResponseDto({
        message: successConstant.SCHEDULE_FETCHED,
        data: scheduleData,
      }),
    );
  }
}
