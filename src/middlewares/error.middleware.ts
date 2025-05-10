import { Request, Response, NextFunction } from "express";

import errorConstant from "../constants/error.constant";
import env from "../env";

export function globalErrorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  void next;

  res.status(500).json({
    success: false,
    error: env.NODE_ENV === "development" ? err.message : errorConstant.INTERNAL_SERVER_ERROR,
  });
}
