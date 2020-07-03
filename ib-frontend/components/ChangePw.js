import React, { Component } from "react";
import { Link } from "react-router-dom";
class ChangePw extends Component {
    handleInput = (e) => {
        e.preventDefault();
    };
    render() {
        return (
            <div className="col-sm-6 offset-3" style={{ marginTop: "50px" }}>
                <div className="card">
                    <article className="card-body">
                        <h4 className="card-title mb-4 mt-1">
                            Thay đổi mật khẩu
                        </h4>

                        <form onSubmit={(e) => this.handleInput(e)}>
                            <div className="form-group">
                                <label>Mật khẩu hiện tại</label>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                                <label>Mật khẩu mới</label>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                                <label>Xác nhận mật khẩu mới</label>
                                <input
                                    className="form-control"
                                    type="password"
                                />
                            </div>{" "}
                            <div className="form-group mt-2">
                                <button className="btn btn-primary btn-block">
                                    {" "}
                                    Thay đổi
                                </button>
                            </div>{" "}
                            {/* <div>
                                {" "}
                                <Link
                                    className="float-right"
                                    to="/"
                                    style={{ textDecoration: "none" }}
                                >
                                    <i
                                        className="fa fa-home"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    Trở về Trang chủ ?
                                </Link>
                            </div> */}
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}

export default ChangePw;
