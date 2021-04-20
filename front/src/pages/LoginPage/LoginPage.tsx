import React from "react";
import { observer } from "mobx-react-lite";
import { IStoreProps } from "../../types";

const LoginPage: React.FC<IStoreProps> = observer(({ store }) => {
  return <div>this is login</div>;
});

export default LoginPage;
