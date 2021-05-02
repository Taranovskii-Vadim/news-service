import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import { Routes } from "./constants";
import { requireAuth } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());

Routes.forEach(({ method, route, controller, action, auth }) => {
  const handler = (req: Request, res: Response, next: Function) => {
    const result = new (controller as any)()[action](req, res, next);
    if (result instanceof Promise) {
      result.then(result =>
        result !== null && result !== undefined ? res.send(result) : undefined
      );
    } else if (result !== null && result !== undefined) {
      res.json(result);
    }
  };

  if (auth) {
    (app as any)[method](route, requireAuth, handler);
  } else {
    (app as any)[method](route, handler);
  }
});

export default app;
