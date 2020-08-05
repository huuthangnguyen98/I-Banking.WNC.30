import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Manager from "../components/Admin/Manager";
import AddEmployee from "../containers/Admin/AddEmployee";
import ChangePw from "../components/ChangePw";
import History from "../components/Admin/History";
class AdRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/">
          <Redirect to="/admin/manage" />
        </Route>
        <Route path="/admin/manage" component={Manager} />
        <Route path="/admin/addemployee" component={AddEmployee} />
        <Route path="/admin/history" component={History} />
        <Route path="/changepw" component={ChangePw} />
      </div>
    );
  }
}
export default AdRoutes;
