import { Prisma, User } from "@prisma/client";
import prisma from "../db/data-sourse";

export class UserRepository {
  private readonly userRepository = prisma.user;

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const newUser = await this.userRepository.create({
      data: user,
    });

    return newUser;
  }
}
