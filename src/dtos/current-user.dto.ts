import { User } from "@prisma/client";

export class CurrentUserDto {
  id!: number;
  chatId!: number;
  username!: string | null;
  nickname!: string | null;
  groupId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<User>) {
    this.id = user.id!;
    this.chatId = Number(user.chatId!);
    this.username = user.username || null;
    this.nickname = user.nickname || null;
    this.groupId = user.groupId!;
    this.createdAt = user.createdAt!;
    this.updatedAt = user.updatedAt!;
  }
}
