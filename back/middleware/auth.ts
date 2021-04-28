import { NextFunction, Response } from "express";

import { IAuthRequest } from "../types";

export const requireAuth = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
