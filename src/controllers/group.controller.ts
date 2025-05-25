import { Request, Response } from "express";

import { GroupService } from "../services/group.service";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import successConstant from "../constants/success.constant";

export class GroupController {
  constructor(private readonly groupService: GroupService = new GroupService()) {}

  async getAllGroups(_req: Request, res: Response) {
    const groups = await this.groupService.getAllGroups();

    res.status(200).json(
      new SuccessResponseDto({
        message: successConstant.GROUPS_FETCHED,
        data: groups,
      }),
    );
  }

  async getGroupById() {}
}
