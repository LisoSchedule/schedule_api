import { Request, Response } from "express";

import { AudienceService } from "../services/audience.service";
import { AddAudienceDto } from "../dtos/add-audience.dto";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import successConstant from "../constants/success.constant";

const { AUDIENCES_FETCHED, AUDIENCE_FETCHED, AUDIENCE_CREATED } = successConstant;

export class AudienceController {
  constructor(private readonly audienceService: AudienceService = new AudienceService()) {}

  async getAllAudiences(_req: Request, res: Response) {
    const audiences = await this.audienceService.getAllAudiences();

    res
      .status(AUDIENCES_FETCHED.statusCode)
      .json(new SuccessResponseDto(audiences, AUDIENCES_FETCHED.message));
  }

  async getAudienceById(req: Request, res: Response) {
    const audienceId = Number(req.params["audienceId"]);

    const audience = await this.audienceService.getAudienceByIdOrThrow(audienceId);

    res
      .status(AUDIENCE_FETCHED.statusCode)
      .json(new SuccessResponseDto(audience, AUDIENCE_FETCHED.message));
  }

  async createAudience(req: Request, res: Response) {
    const data: AddAudienceDto = {
      body: req.body,
    };

    const newAudience = await this.audienceService.createAudience(data);

    res
      .status(AUDIENCE_CREATED.statusCode)
      .json(new SuccessResponseDto(newAudience, AUDIENCE_CREATED.message));
  }
}
