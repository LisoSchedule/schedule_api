import { ReminderTime, UserSettings } from "@prisma/client";
import prisma from "../db/data-sourse";

export class UserSettingsRepository {
  private readonly userSettingsRepository = prisma.userSettings;

  /**
   * @description
   * Upsert user settings in the database.
   * - If the user settings already exist, update them.
   * - If they do not exist, create new settings with passed or default values.
   */
  async upsertUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings> {
    return await this.userSettingsRepository.upsert({
      where: {
        userId,
      },
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        userId,
        notifications: data.notifications ?? true,
        reminderTime: data.reminderTime ?? ReminderTime.ThirtyMinutes,
      },
    });
  }
}
