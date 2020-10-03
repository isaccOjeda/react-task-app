import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import AuthScreen from "./components/AuthScreen";
import BasicProvider from "./components/common/BasicProvider";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <BasicProvider>
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <Route exact path="/auth" component={AuthScreen} />
      </Switch>
    </BasicProvider>
  );
}

export default App;
