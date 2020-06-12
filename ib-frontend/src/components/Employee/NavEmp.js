import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => (
    <nav className="navbar navbar-dark bg-dark">
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/employee/addcustomer">
                    Tạo tài khoản
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/employee/payin">
                    Nạp tiền
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/employee/history">
                    Tra cứu lịch sử
                </NavLink>
            </li>
        </ul>
    </nav>
);

export default Nav;
