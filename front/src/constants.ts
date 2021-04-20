export const LOCAL_STORAGE_USER_KEY = "news_current_user";

interface IDefenitionApi {
  [key: string]: (param?: any) => string;
}

export const ROUTES: IDefenitionApi = {
  login: () => "/login",
  logout: () => "/logout",
  records: () => "/records",
  record: (id: string | number) => `/record/${id}`,
};

export const ENDPOINTS: IDefenitionApi = {
  login: () => "/api/auth/login",
  logout: () => "/api/auth/logout",
  records: () => "/api/records",
  record: (id: number) => `/api/record/${id}`,
  upload: () => "/api/upload",
};
