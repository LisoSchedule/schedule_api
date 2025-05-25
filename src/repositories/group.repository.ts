import prisma from "../db/data-sourse";

export class GroupRepository {
  private readonly groupRepository = prisma.group;

  async getAllGroups() {
    return await this.groupRepository.findMany();
  }

  async getGroupById(groupId: number) {
    return await this.groupRepository.findUnique({
      where: { id: groupId },
      include: {
        users: true,
        lessons: {
          select: {
            id: true,
            subject: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
            teacher: {
              select: {
                id: true,
                name: true,
                position: true,
              },
            },
            audience: {
              select: {
                id: true,
                name: true,
              },
            },
            startTime: true,
            duration: true,
          },
        },
      },
    });
  }
}
