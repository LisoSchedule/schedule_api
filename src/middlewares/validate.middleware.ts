import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

import errorConstant from "../constants/error.constant";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res
        .status(400)
        .json({ success: false, error: errorConstant.INVALID_DATA, details: errorMessages });

      return;
    }

    // Setting query, body and params in case schema has z.coerce

    res.locals["validated"] = result.data;

    next();
  };
}
