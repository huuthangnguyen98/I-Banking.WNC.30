import React, { Component } from "react";

class PayIn extends Component {
    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên đăng nhập hoặc số tài khoản"
                        />
                    </div>
                    <div className="form-group col">
                        <button type="submit" className="btn btn-primary">
                            Xác minh
                        </button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Số tiền nạp"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                        Xác nhận
                    </button>
                </div>
            </form>
        );
    }
}

export default PayIn;
