import { BadRequest, NotFound } from "http-errors";

import { GroupRepository } from "../repositories/group.repository";
import errorConstant from "../constants/error.constant";

export class GroupService {
  constructor(private readonly groupRepository: GroupRepository = new GroupRepository()) {}

  async getAllGroups() {
    const groups = await this.groupRepository.getAllGroups();

    if (!groups || groups.length === 0) {
      throw new NotFound(errorConstant.NOT_FOUND);
    }

    return groups;
  }

  async getGroupById() {}
}
