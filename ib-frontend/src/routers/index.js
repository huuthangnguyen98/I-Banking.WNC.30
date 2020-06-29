import React, { Component } from "react";
//import Employee from "../components/Employee/EmployeeDashboard";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
//import Admin from "../components/Admin/Admin";
import { Route, Switch } from "react-router-dom";
//import Customer from "../components/Customer/Customer";
import Forgot from "../components/Forgot";
import ChangePw from "../components/ChangePw";
class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Login} />
                {/* <Route path="/employee" component={Employee} /> */}
                <Route path="/login" component={Login} />
                {/* <Route path="/customer" component={Customer} />
                <Route path="/admin" component={Admin} /> */}
                <Route path="/forgot" component={Forgot} />
                <Route path="/changepw" component={ChangePw} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
export default Routes;
