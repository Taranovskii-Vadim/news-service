import { AuthController } from "./controller/authController";
import { RecordsController } from "./controller/recordsController";

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
  {
    method: "get",
    route: `${API_PREFIX}/records`,
    controller: RecordsController,
    action: "all",
    auth: false,
  },
  {
    method: "get",
    route: `${API_PREFIX}/record/:id`,
    controller: RecordsController,
    action: "one",
    auth: false,
  },
  {
    method: "delete",
    route: `${API_PREFIX}/record/:id`,
    controller: RecordsController,
    action: "remove",
    // TODO поменять на true
    auth: false,
  },
  {
    method: "post",
    route: `${API_PREFIX}/records`,
    controller: RecordsController,
    action: "save",
    // TODO поменять на true
    auth: false,
  },
];
