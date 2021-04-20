import { observer } from "mobx-react-lite";
import { IStoreProps } from "../../types";
import { ENDPOINTS } from "../../constants";

export default observer(({ store }: IStoreProps) => {
  store.logout();
  window.location.href = ENDPOINTS.logout();

  return null;
});
