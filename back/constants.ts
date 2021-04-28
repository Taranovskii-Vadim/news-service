import { AuthController } from "./controller/authController";

export const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const API_PREFIX = "/api";

export const ERROR = {
  JWT_MISCONFIGURED: `No JWT secret found in env!`,
  USER_NOT_FOUND_IN_DB: `User not found in local DB`,
};

export const COOKIE_KEY = `news_jwt`;

export const Routes = [
  {
    method: "post",
    route: `${API_PREFIX}/auth/login`,
    controller: AuthController,
    action: "login",
    auth: false,
  },
  {
    method: "get",
    route: `${API_PREFIX}/auth/logout`,
    controller: AuthController,
    action: "logout",
    auth: false,
  },
];
