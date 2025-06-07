import { UserWithSettingsDto } from "../dtos/user-with-settings.dto";
import { UserWithSettings } from "../types/user-with-settings.type";

export class UserWithSettingsMapper {
  toDto(user: UserWithSettings): UserWithSettingsDto {
    return {
      id: user.id,
      chatId: Number(user.chatId),
      username: user.username ?? null,
      nickname: user.nickname ?? null,
      email: user.email ?? null,
      groupId: user.groupId ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      settings: user.settings
        ? {
            id: user.settings.id,
            userId: user.settings.userId,
            notifications: user.settings.notifications,
            reminderTime: user.settings.reminderTime ?? null,
            createdAt: user.settings.createdAt,
            updatedAt: user.settings.updatedAt,
          }
        : null,
    };
  }
}
