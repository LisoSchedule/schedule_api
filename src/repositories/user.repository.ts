import { Prisma, User } from "@prisma/client";
import { UserWithSettings } from "../types/user-with-settings.type";
import prisma from "../db/data-sourse";

export class UserRepository {
  private readonly userRepository = prisma.user;

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const newUser = await this.userRepository.create({
      data: user,
    });

    return newUser;
  }

  async findUserById(userId: number): Promise<User | null> {
    const user = await this.userRepository.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findUserByChatId(chatId: bigint): Promise<User | null> {
    const user = await this.userRepository.findFirst({
      where: {
        chatId,
      },
    });

    return user;
  }

  async getUserWithSettings(userId: number): Promise<UserWithSettings> {
    const userWithSettings = await this.userRepository.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        settings: true,
      },
    });

    return userWithSettings;
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const updatedUser = await this.userRepository.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser;
  }

  async deleteUser(userId: number) {
    await this.userRepository.delete({
      where: {
        id: userId,
      },
    });
  }
}
