import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Manager from "../components/Admin/Manager";
class AdRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/">
                    <Redirect to="/admin/manage" />
                </Route>
                <Route path="/admin/manage" component={Manager} />
                <Route path="/admin/history" />
            </div>
        );
    }
}
export default AdRoutes;
