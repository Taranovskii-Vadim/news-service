import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ERROR, COOKIE_KEY, ONE_WEEK } from "../constants";
import { db } from "../db";
import { IAppUser } from "../types";
import { USERS } from "../test/users";

export class AuthController {
  private async getDbUser(login: string) {
    const res = await db.query("SELECT * FROM users where login = $1", [login]);
    const user = res.rows[0];
    if (user && user.id) {
      return user;
    } else {
      throw new Error(ERROR.USER_NOT_FOUND_IN_DB);
    }
  }

  private getMockedUser(
    login: string,
    password: string
  ): Promise<IAppUser | null> {
    const user = USERS.find(u => u.login === login && u.password === password);
    return new Promise(resolve => {
      if (user) {
        const { password, ...rest } = user;
        resolve(rest);
      } else {
        resolve(null);
      }
    });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error(ERROR.JWT_MISCONFIGURED);
      }

      const user =
        (await this.getMockedUser(login, password)) ||
        (await this.getDbUser(login));

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
