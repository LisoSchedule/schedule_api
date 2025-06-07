import { Prisma } from "@prisma/client";
import { UpdateUserDto } from "../dtos/update-user.dto";

export class UpdateUserBuilder {
  private dataToUpdate: Prisma.UserUpdateInput = {};

  constructor(updateUserDto: UpdateUserDto) {
    if (updateUserDto.nickname) {
      this.dataToUpdate.nickname = updateUserDto.nickname;
    }

    if (updateUserDto.email) {
      this.dataToUpdate.email = updateUserDto.email;
    }

    this.dataToUpdate.updatedAt = new Date();
  }

  build(): Prisma.UserUpdateInput {
    return this.dataToUpdate;
  }
}
