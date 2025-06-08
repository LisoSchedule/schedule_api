import { z as zod } from "zod";
import { AddAudienceSchema } from "../validators/add-audience.validator";

export type AddAudienceDto = zod.infer<typeof AddAudienceSchema>;
