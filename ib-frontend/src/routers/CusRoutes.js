import React, { Component } from "react";
import { Route } from "react-router-dom";
import Receivers from "../components/Customer/Receivers";
import Transfer from "../components/Customer/Transfer";
import Debts from "../components/Customer/Debts";
import History from "../components/Customer/History";
import Home from "../components/Customer/Home";
class EmpRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/customer/receivers" component={Receivers} />
                <Route path="/customer/transfer" component={Transfer} />
                <Route path="/customer/debts" component={Debts} />
                <Route path="/customer/history" component={History} />
            </div>
        );
    }
}
export default EmpRoutes;