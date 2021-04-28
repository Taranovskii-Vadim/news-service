import { IAppUser } from "../types";

export const USERS: (IAppUser & { password: string })[] = [
  {
    id: 1,
    email: "vgtaranovsky@test.ru",
    login: "vadim",
    firstName: "вадим",
    lastName: "тарановский",
    password: "qwerty",
  },
];
