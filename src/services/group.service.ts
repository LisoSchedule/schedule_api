import createHttpError from "http-errors";

import { Prisma } from "@prisma/client";
import { GroupRepository } from "../repositories/group.repository";
import { GroupWithRelationsMapper } from "../mappers/group-with-relations.mapper";
import { GroupWithRelationsDto } from "../dtos/group-with-relations.dto";
import { AddGroupDto } from "../dtos/add-group.dto";
import errorConstant from "../constants/error.constant";

const { GROUP_NOT_FOUND, NOT_FOUND, BAD_REQUEST } = errorConstant;

export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository = new GroupRepository(),
    private readonly groupWithRelationsMapper: GroupWithRelationsMapper = new GroupWithRelationsMapper(),
  ) {}

  async getAllGroups() {
    const groups = await this.groupRepository.getAllGroups();

    if (!groups || groups.length === 0) {
      throw createHttpError(NOT_FOUND.statusCode, NOT_FOUND.message);
    }

    return groups;
  }

  async getGroupById(groupId: number) {
    if (!groupId) {
      throw createHttpError(errorConstant.BAD_REQUEST);
    }

    const group = await this.groupRepository.getGroupById(groupId);

    if (!group) {
      throw createHttpError(GROUP_NOT_FOUND.statusCode, GROUP_NOT_FOUND.message);
    }

    const groupWithRelationsDto: GroupWithRelationsDto = this.groupWithRelationsMapper.toDto(group);

    return groupWithRelationsDto;
  }

  async createGroup(data: AddGroupDto) {
    const { name, subGroup } = data.body || data;

    const groupToCreate: Prisma.GroupCreateInput = {
      name,
      subGroup,
    };

    const createdGroup = await this.groupRepository.createGroup(groupToCreate);

    if (!createdGroup) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return createdGroup;
  }
}
