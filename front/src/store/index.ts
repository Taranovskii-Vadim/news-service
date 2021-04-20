import { action, computed, makeObservable, observable } from "mobx";
import { LOCAL_STORAGE_USER_KEY } from "../constants";
import { IRecord, IUser } from "../types";

export default class RootStore {
  isLoading = false;
  currentRecord: IRecord | null = null;
  records: IRecord[] = [];
  //   TODO: сменить на null позже
  user: IUser | null = null;
  // {
  //   id: 1,
  //   email: "test@test.ru",
  //   login: "prgVadim",
  //   firstName: "Вадим",
  //   lastName: "Тарановский",
  // };
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

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.user = null;
  }
}
