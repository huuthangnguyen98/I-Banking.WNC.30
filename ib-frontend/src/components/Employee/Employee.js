import React, { Component } from "react";
import Nav from "../Nav";
import NavEmp from "./NavEmp";
import EmpRoutes from "../../routers/EmpRoutes";
class EmployeeDashboard extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Nav />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <div className="container">
                <NavEmp />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="container mt-4">
                <EmpRoutes />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeDashboard;
