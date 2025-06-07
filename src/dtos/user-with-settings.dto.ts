import { ReminderTime } from "@prisma/client";

export type UserWithSettingsDto = {
  id: number;
  chatId: number;
  username: string | null;
  nickname: string | null;
  email: string | null;
  groupId: number | null;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    id: number;
    userId: number;
    notifications: boolean;
    reminderTime?: ReminderTime;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};
