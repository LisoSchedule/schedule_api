import { Audience, Prisma } from "@prisma/client";
import prisma from "../db/data-sourse";

export class AudienceRepository {
  private readonly audienceRepository = prisma.audience;

  async getAllAudiences() {
    return await this.audienceRepository.findMany();
  }

  async getAudienceById(audienceId: number) {
    return await this.audienceRepository.findUnique({
      where: {
        id: audienceId,
      },
    });
  }

  async createAudience(audienceToCreate: Prisma.AudienceCreateInput): Promise<Audience> {
    return await this.audienceRepository.create({
      data: audienceToCreate,
    });
  }
}
