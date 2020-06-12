import React from "react";
const Nav = () => (
    <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h4>I-Banking</h4>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="./"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            htnguyen
                            <i
                                className="fa fa-user-circle-o fa-lg ml-2"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                        >
                            <a className="dropdown-item" href="./">
                                Thông tin{" "}
                                <i
                                    className="fa fa-info"
                                    aria-hidden="true"
                                ></i>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="./">
                                Đăng xuất{" "}
                                <i
                                    className="fa fa-sign-out"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);
export default Nav;
