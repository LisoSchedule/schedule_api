import { ReminderTime } from "@prisma/client";

export type UserWithSettingsDto = {
  id: number;
  chatId: number;
  username: string | null;
  nickname: string | null;
  settings: {
    id: number;
    userId: number;
    notifications: boolean;
    reminderTime?: ReminderTime;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};
