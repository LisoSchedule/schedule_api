import { User, UserStep } from "@prisma/client";

export class CurrentUserDto {
  id!: number;
  chatId!: bigint;
  username!: string | null;
  nickname!: string | null;
  groupId!: number;
  step!: UserStep;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<User>) {
    this.id = user.id!;
    this.chatId = user.chatId!;
    this.username = user.username || null;
    this.nickname = user.nickname || null;
    this.groupId = user.groupId!;
    this.step = user.step!;
    this.createdAt = user.createdAt!;
    this.updatedAt = user.updatedAt!;
  }
}
