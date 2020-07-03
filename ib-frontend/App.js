import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import IndexRoute from "./routers/index";
import Admin from "./components/Admin/Admin";
//import Login from "./components/Login";
import Customer from "./components/Customer/Customer";
import Employee from "./components/Employee/Employee";
class App extends Component {
    render() {
        let main;
        let role = this.props.Auth.role;
        if (role === 0) main = <IndexRoute />;
        else if (role === 1) main = <Customer />;
        else if (role === 2) main = <Employee />;
        else if (role === 3) main = <Admin />;
        // console.log(this.props.Auth.role);

        return (
            <Router>
                <div className="container">
                    {/* <IndexRoute /> */}
                    {main}
                </div>
            </Router>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        Auth: state.Auth,
    };
};

export default connect(mapStateToProps, null)(App);
