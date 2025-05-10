import { Request, Response, NextFunction } from "express";

type CatchController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function catchHandler(controller: CatchController) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
