import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Link } from "react-router-dom";
class Nav extends Component {
    render() {
        return (
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
                                    <Link
                                        to="/changepw"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                this.props.onLogout()
                                            }
                                        >
                                            Đổi mật khẩu{" "}
                                            <i
                                                className="fa fa-sign-out"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link
                                        to="/"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                this.props.onLogout()
                                            }
                                        >
                                            Đăng xuất{" "}
                                            <i
                                                className="fa fa-sign-out"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(actions.logout());
        },
    };
};
export default connect(null, mapDispatchToProps)(Nav);
