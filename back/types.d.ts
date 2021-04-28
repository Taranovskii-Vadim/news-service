import { Request } from "express";

export interface IAuthRequest extends Request {
  user?: any;
}

export interface IAppUser {
  readonly id: number;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
}
