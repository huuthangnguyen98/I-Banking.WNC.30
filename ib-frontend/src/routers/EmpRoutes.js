import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddCustomer from "../components/Employee/AddCustomer";
import PayIn from "../components/Employee/PayIn";
import History from "../components/Employee/History";
class EmpRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/employee/addcustomer" component={AddCustomer} />
                <Route path="/employee/payin" component={PayIn} />
                <Route path="/employee/history" component={History} />
            </div>
        );
    }
}
export default EmpRoutes;
