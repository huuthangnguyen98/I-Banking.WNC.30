import React, { Component } from "react";
import { Route } from "react-router-dom";
class AdRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/admin/manage" />
                <Route path="/admin/history" />
            </div>
        );
    }
}
export default AdRoutes;
