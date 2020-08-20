import React from "react";
import { NavLink } from "react-router-dom";
const NavAdmin = () => (
  <nav className="navbar navbar-dark bg-dark">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/manage">
          Quản lí nhân viên
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/addemployee">
          Thêm nhân viên
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/history">
          Danh sách giao dịch
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavAdmin;
// done here
