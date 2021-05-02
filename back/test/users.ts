import { IAppUser } from "../types";

export const USERS: (IAppUser & { password: string })[] = [
  {
    id: 2,
    email: "petr@test.ru",
    login: "petr",
    firstName: "петр",
    lastName: "иванов",
    password: "1234",
  },
];
