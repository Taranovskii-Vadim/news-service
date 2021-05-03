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

interface IRecordData {
  title?: IRecord["title"];
  description?: IRecord["description"];
  editorData?: IRecord["editorData"];
}

const emptyRecord = () => ({
  title: `Новая новость`,
  description: `Краткое описание`,
  editorData: {
    time: new Date().getTime(),
    version: `2.19.0`,
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Заголовок",
        },
      },
    ],
  },
});

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

  async fetchRecord(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const record: IRecord = await ky.get(ENDPOINTS.record(id)).json();
      if (record) {
        runInAction(() => {
          this.currentRecord = record;
        });
      }
    } catch (e) {
      console.error(`Failed to fetch record, reason: ${e}`);
    } finally {
      this.isLoading = false;
    }
  }

  newRecord(): void {
    this.currentRecord = emptyRecord();
  }

  closeRecord(): void {
    this.currentRecord = null;
  }

  update(data: IRecordData): void {
    if (this.currentRecord) {
      this.currentRecord = {
        ...this.currentRecord,
        ...data,
      };
    }
  }

  async saveRecord(): Promise<void> {
    try {
      const newRecord: IRecord = await ky
        .post(ENDPOINTS.records(), {
          json: this.currentRecord,
        })
        .json();
      runInAction(() => {
        if (this.currentRecord) {
          this.records = [...this.records, newRecord];
        }
        this.currentRecord = newRecord;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async removeRecord(id: number): Promise<void> {
    this.isLoading = true;
    try {
      await ky.delete(ENDPOINTS.record(id)).json();
      runInAction(() => {
        this.records = this.records.filter(item => item.id !== id);
      });
    } catch (e) {
      console.error(`Failed to remove record, reason: ${e}`);
    } finally {
      this.isLoading = false;
    }
  }
}
