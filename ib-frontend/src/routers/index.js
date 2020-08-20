import React, { Component } from "react";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import { Route, Switch } from "react-router-dom";
import Forgot from "../components/Forgot";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/forgot" component={Forgot} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
export default Routes;
// end hree
