import { Request, Response } from "express";

import { GroupService } from "../services/group.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { GroupWithRelationsDto } from "../dtos/group-with-relations.dto";
import successConstant from "../constants/success.constant";

const { GROUPS_FETCHED, GROUP_FETCHED } = successConstant;

export class GroupController {
  constructor(private readonly groupService: GroupService = new GroupService()) {}

  async getAllGroups(_req: Request, res: Response) {
    const groups = await this.groupService.getAllGroups();

    res
      .status(GROUPS_FETCHED.statusCode)
      .json(new SuccessResponseDto(groups, GROUPS_FETCHED.message));
  }

  async getGroupById(req: Request, res: Response) {
    const groupId = Number(req.params["groupId"]);

    const group: GroupWithRelationsDto = await this.groupService.getGroupById(groupId);

    res.status(GROUP_FETCHED.statusCode).json(new SuccessResponseDto(group, GROUP_FETCHED.message));
  }
}
