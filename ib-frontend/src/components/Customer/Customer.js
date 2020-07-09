import React, { Component } from "react";
import Nav from "../Nav";
import NavCustomer from "../Customer/NavCustomer";
import CusRoutes from "../../routers/CusRoutes";
class Customer extends Component {
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
                <NavCustomer />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="container mt-4">
                <CusRoutes />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customer;
