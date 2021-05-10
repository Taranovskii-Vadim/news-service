import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ERROR, COOKIE_KEY, ONE_WEEK } from "../constants";
import { db } from "../db";
import { IAuthRequest } from "../types";

export class AuthController {
  private async getDbUser(email: string, password: string) {
    const res = await db.query(
      "SELECT * FROM users where email = $1 AND password = $2",
      [email, password]
    );
    const user = res.rows[0];
    if (user && user.id) {
      return user;
    } else {
      throw new Error(ERROR.USER_NOT_FOUND_IN_DB);
    }
  }

  async login(req: IAuthRequest, res: Response) {
    const { email, password } = req.body;
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error(ERROR.JWT_MISCONFIGURED);
      }

      const user = await this.getDbUser(email, password);

      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.cookie(COOKIE_KEY, token, { maxAge: ONE_WEEK, httpOnly: true });
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(user));
      res.end();
    } catch (e) {
      res.status(403).send(`Forbidden: ${e}`);
    }
  }

  async signUp(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    // TODO: can do validate using express
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error(ERROR.JWT_MISCONFIGURED);
      }

      await db.query(
        `INSERT INTO users(name, surname, email, password)
         VALUES ($1,$2,$3,$4)`,
        [name, surname, email, password]
      );
      const user = await this.getDbUser(email, password);

      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.cookie(COOKIE_KEY, token, { maxAge: ONE_WEEK, httpOnly: true });
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(user));
      res.end();
    } catch (e) {
      res.status(403).send(`Forbidden: ${e}`);
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie(COOKIE_KEY);
    res.writeHead(302, { location: "/login" });
    res.end();
  }
}
