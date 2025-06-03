import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import rateLimit from "express-rate-limit";

import errorConstant from "../constants/error.constant";

const { TOO_MANY_REQUESTS } = errorConstant;

export const limiter = (windowMs: number, limit: number, limiterForUser?: boolean) => {
  return rateLimit({
    windowMs,
    limit,
    keyGenerator: (req: Request): string => {
      if (limiterForUser) {
        const chatId = req.body?.telegramId || req.query?.["telegramId"];
        return chatId || "";
      }
      return req.ip || "";
    },
    handler: (_req: Request, _res: Response, next: NextFunction) => {
      next(createHttpError(TOO_MANY_REQUESTS.statusCode, TOO_MANY_REQUESTS.message));
    },
    skipFailedRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
