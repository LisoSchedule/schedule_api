import prisma from "../db/data-sourse";

export class GroupRepository {
  private readonly groupRepository = prisma.group;

  async getAllGroups() {
    return await this.groupRepository.findMany();
  }

  async GetGroupById() {}
}
