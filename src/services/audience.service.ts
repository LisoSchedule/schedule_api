import createHttpError from "http-errors";

import { AudienceRepository } from "../repositories/audience.repository";
import { AddAudienceDto } from "../dtos/add-audience.dto";
import { Prisma } from "@prisma/client";
import errorConstant from "../constants/error.constant";

const { AUDIENCE_NOT_FOUND, BAD_REQUEST } = errorConstant;

export class AudienceService {
  constructor(private readonly audienceRepository: AudienceRepository = new AudienceRepository()) {}

  async getAllAudiences() {
    return await this.audienceRepository.getAllAudiences();
  }

  async getAudienceById(audienceId: number) {
    return await this.audienceRepository.getAudienceById(audienceId);
  }

  async getAudienceByIdOrThrow(audienceId: number) {
    const audience = await this.getAudienceById(audienceId);

    if (!audience) {
      throw createHttpError(AUDIENCE_NOT_FOUND.statusCode, AUDIENCE_NOT_FOUND.message);
    }

    return audience;
  }

  async createAudience(data: AddAudienceDto) {
    const { name } = data.body || data;

    const audienceToCreate: Prisma.AudienceCreateInput = {
      name,
    };

    const createdAudience = await this.audienceRepository.createAudience(audienceToCreate);

    if (!createdAudience) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdAudience;
  }
}
