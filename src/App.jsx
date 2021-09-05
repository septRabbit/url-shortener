import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import Redirect from "./Redirect";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/result">
        <Result />
      </Route>
      <Route path="/:hash">
        <Redirect />
      </Route>
    </Switch>
  );
}

export default App;
