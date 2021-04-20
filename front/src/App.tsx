import React from "react";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ROUTES } from "./constants";

import Login from "./pages/LoginPage";
import Logout from "./pages/LogoutPage";

import RootStore from "./store";

const store = new RootStore();

// window.__ROOT = store;

const App: React.FC = observer(() => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.login()} exact>
          <Login store={store} />
        </Route>
        <Route path={ROUTES.logout()} exact>
          <Logout store={store} />
        </Route>
        <Route>
          {store.user ? (
            <p>Welcome</p>
          ) : (
            <Redirect to={{ pathname: ROUTES.login() }} />
          )}
        </Route>
      </Switch>
    </Router>
  );
});

export default App;
