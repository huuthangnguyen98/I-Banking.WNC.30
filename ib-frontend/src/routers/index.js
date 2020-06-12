import React, { Component } from "react";
import Employee from "../components/Employee/EmployeeDashboard";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Admin from "../components/Admin/Admin";
import { Route, Switch } from "react-router-dom";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/employee" component={Employee} />
                <Route path="/login" component={Login} />
                <Route path="/customer" component={NotFound} />
                <Route path="/admin" component={Admin} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
export default Routes;
