import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { COOKIE_KEY } from "../constants";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = jwt.decode(req.cookies[COOKIE_KEY]);

  if (user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
