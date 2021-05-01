import ky from "ky";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ENDPOINTS, LOCAL_STORAGE_USER_KEY } from "../constants";
import { IRecord, IUser } from "../types";

export default class RootStore {
  isLoading = false;
  currentRecord: IRecord | null = null;
  records: IRecord[] = [];

  user: IUser | null = null;

  constructor() {
    const userJSON = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    makeObservable(this, {
      isLoading: observable,
      records: observable,
      user: observable,
      currentRecord: observable,

      fullName: computed,

      logout: action,
    });
  }

  get fullName(): string {
    return `${this.user.lastName} ${this.user.firstName}`;
  }

  async login(login: string, password: string): Promise<void> {
    try {
      const user: IUser = await ky
        .post(ENDPOINTS.login(), {
          json: { login, password },
        })
        .json();
      if (user) {
        runInAction(() => {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
          this.user = user;
        });
      }
    } catch (e) {
      console.error(`Failed to login, reason: ${e}`);
    }
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.user = null;
  }

  async fetchRecords(): Promise<void> {
    try {
      const records: IRecord[] = await ky.get(ENDPOINTS.records()).json();
      if (records) {
        runInAction(() => {
          this.records = records;
        });
      }
    } catch (e) {
      console.error(`Failed to fetch records reason: ${e}`);
    } finally {
      this.isLoading = false;
    }
  }
}
