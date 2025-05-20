import { z as zod } from "zod";
import { UpdateUserSettingsSchema } from "../validators/update-user-settings.validator";

export type UpdateUserSettingsDto = zod.infer<typeof UpdateUserSettingsSchema>["body"];
