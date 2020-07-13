import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NavCustomer extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <ul className="navbar-nav  ">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Thông tin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer/receivers">
              Danh sách người nhận
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer/transfer">
              Chuyển khoản
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer/debts">
              Quản lí nhắc nợ{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer/history">
              Lịch sử giao dịch
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavCustomer;
