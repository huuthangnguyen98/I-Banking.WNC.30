import React, { Component } from "react";
import AddCustomer from "./AddCustomer";
import PayIn from "./PayIn";
import History from "./History";

class EmployeeDashboard extends Component {
    constructor() {
        super();
        this.state = {
            tabIndex: 1,
        };
    }
    setTabIndex = (index) => {
        this.setState({
            tabIndex: index,
        });
    };
    render() {
        const name = "htnguyen";
        return (
            <div>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="./">
                            I-Banking
                        </a>

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
                                        {name}{" "}
                                        <i
                                            className="fa fa-user-circle-o fa-lg"
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="list-group">
                                <button
                                    onClick={this.setTabIndex.bind(this, 1)}
                                    className="btn list-group-item list-group-item-action"
                                >
                                    Tạo tài khoản
                                </button>
                                <button
                                    onClick={this.setTabIndex.bind(this, 2)}
                                    className="btn list-group-item list-group-item-action"
                                >
                                    Nạp tiền vào tài khoản
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={this.setTabIndex.bind(this, 3)}
                                >
                                    Xem lịch sử giao dịch
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="container mt-4">
                                {this.state.tabIndex === 1 ? (
                                    <AddCustomer />
                                ) : this.state.tabIndex === 2 ? (
                                    <PayIn />
                                ) : (
                                    <History />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeDashboard;
