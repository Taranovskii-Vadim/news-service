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

export interface IRecord {
  readonly id: number;
  title: string;
  description: string;
  editorData?: {
    time: number;
    version: string;
    blocks: { type: string; data: any }[];
  };
  timestamp?: string;
  user?: {
    readonly id: number;
    login: string;
  };
}
