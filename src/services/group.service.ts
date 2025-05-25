import { BadRequest, NotFound } from "http-errors";

import { GroupRepository } from "../repositories/group.repository";
import { GroupWithRelationsMapper } from "../mappers/group-with-relations.mapper";
import { GroupWithRelationsDto } from "../dtos/group-with-relations.dto";
import errorConstant from "../constants/error.constant";

export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository = new GroupRepository(),
    private readonly groupWithRelationsMapper: GroupWithRelationsMapper = new GroupWithRelationsMapper(),
  ) {}

  async getAllGroups() {
    const groups = await this.groupRepository.getAllGroups();

    if (!groups || groups.length === 0) {
      throw new NotFound(errorConstant.NOT_FOUND);
    }

    return groups;
  }

  async getGroupById(groupId: number) {
    if (!groupId) {
      throw new BadRequest(errorConstant.BAD_REQUEST);
    }

    const group = await this.groupRepository.getGroupById(groupId);

    if (!group) {
      throw new NotFound(errorConstant.NOT_FOUND);
    }

    const groupWithRelationsDto: GroupWithRelationsDto = this.groupWithRelationsMapper.toDto(group);

    return groupWithRelationsDto;
  }
}
