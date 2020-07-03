import React, { Component } from "react";
import { Link } from "react-router-dom";
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg: false,
        };
    }
    handleInput = (e) => {
        e.preventDefault();
    };
    render() {
        if (this.state.errMsg)
            var wrongHandle = (
                <div className="alert alert-danger alert-sm" role="alert">
                    Email không tồn tại/ chưa đăng kí dịch vụ I-banking.
                </div>
            );
        return (
            <div className="col-sm-4 offset-4" style={{ marginTop: "100px" }}>
                <div className="card">
                    <article className="card-body">
                        <h4 className="card-title mb-4 mt-1">Quên mật khẩu</h4>
                        {wrongHandle}
                        <form onSubmit={(e) => this.handleInput(e)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    placeholder="Địa chỉ email"
                                    // type="email"
                                    type="text"
                                    ref="username"
                                />
                            </div>{" "}
                            <div className="form-group mt-2">
                                <button className="btn btn-primary btn-block">
                                    {" "}
                                    Tiếp tục
                                </button>
                            </div>{" "}
                            <div>
                                {" "}
                                <Link
                                    className="float-right"
                                    to="/"
                                    style={{ textDecoration: "none" }}
                                >
                                    Đăng nhập?
                                </Link>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}

export default Forgot;
