import RootStore from "./store";

export interface IUser {
  readonly id: number;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
}

export interface IStoreProps {
  store: RootStore;
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
