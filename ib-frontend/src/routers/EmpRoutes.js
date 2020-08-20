import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AddCustomer from "../containers/Employee/AddCustomer";
import PayIn from "../components/Employee/PayIn";
import History from "../components/Employee/History";
import ChangePw from "../components/ChangePw";
class EmpRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact>
                    <Redirect to="/employee/addcustomer" />
                </Route>
                <Route path="/employee/addcustomer" component={AddCustomer} />
                <Route path="/employee/payin" component={PayIn} />
                <Route path="/employee/history" component={History} />
                <Route path="/changepw" component={ChangePw} />
            </div>
        );
    }
}
export default EmpRoutes;
// end here
