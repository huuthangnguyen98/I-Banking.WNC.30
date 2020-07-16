import React, { Component } from "react";
import { Route } from "react-router-dom";
import Receivers from "../components/Customer/Receivers";
import Transfer from "../components/Customer/Transfer";
import Debts from "../components/Customer/Debts";
import History from "../components/Customer/History";
import Home from "../components/Customer/Home";
import ChangePw from "../components/ChangePw";
import allnotifications from "../components/Customer/allNotifications";
class EmpRoutes extends Component {
  render() {
    return (
      <div className="mt-4">
        <Route path="/" exact component={Home} />
        <Route path="/customer/receivers" component={Receivers} />
        <Route path="/customer/transfer" component={Transfer} />
        <Route path="/customer/debts" component={Debts} />
        <Route path="/customer/history" component={History} />
        <Route path="/customer/allnotifications" component={allnotifications} />
        <Route path="/changepw" component={ChangePw} />
      </div>
    );
  }
}
export default EmpRoutes;
