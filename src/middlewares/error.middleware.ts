import { Request, Response, NextFunction } from "express";

import errorConstant from "../constants/error.constant";
import env from "../env";
import { HttpError } from "http-errors";

export function globalErrorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  void next;

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: env.NODE_ENV === "development" ? err.message : errorConstant.INTERNAL_SERVER_ERROR,
  });
}
