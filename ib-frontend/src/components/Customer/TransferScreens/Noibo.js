import React, { Component } from "react";

class Noibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: true,
            reqOtp: false,
            ngNhan: "",
            ngNhanErr: "",
            sotien: "",
            sotienErr: "",
        };
    }
    changeClass = () => {
        this.setState({
            class: !this.state.class,
        });
    };
    formValide = (e) => {
        let error = false;
        e.preventDefault();

        if (this.state.ngNhan === "" && this.state.class === false) {
            this.setState({
                ngNhanErr: "Bạn cần nhập số tài khoản người nhận",
            });
            error = true;
        }
        if (this.state.sotien === "" || typeof this.state.sotien !== "number") {
            this.setState({
                sotienErr: "Vui lòng nhập số tiền hợp lệ",
            });
            error = true;
        }
        if (!error) this.sendReq();
    };
    sendReq = () => {
        this.setState({
            reqOtp: true,
        });
        console.log("Nhap OTP");
    };
    render() {
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        if (window.confirm("Xác nhận thực hiện giao dịch?"))
                            this.formValide(e);
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                            Chọn tài khoản thanh toán
                        </label>
                        <select className="form-control">
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-around mb-2">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                name="trongList"
                                id="trongList"
                                className="custom-control-input"
                                checked={this.state.class}
                                onChange={() => this.changeClass()}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="trongList"
                            >
                                Người nhận trong danh sách
                            </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                name="ngoaiList"
                                id="ngoaiList"
                                className="custom-control-input"
                                checked={!this.state.class}
                                onChange={() => this.changeClass()}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="ngoaiList"
                            >
                                Nhập số tài khoản
                            </label>
                        </div>
                    </div>
                    {this.state.class ? (
                        <div>
                            <label htmlFor="exampleFormControlSelect1">
                                Chọn người nhận
                            </label>
                            <select className="form-control">
                                <option>Aurthur</option>
                                <option>Pijanic</option>
                            </select>
                        </div>
                    ) : (
                        <div className="form-group mt-2">
                            <span style={{ color: "red" }}>
                                {this.state.ngNhanErr}
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Số tài khoản người nhận"
                                onChange={(e) => {
                                    this.setState({
                                        ngNhan: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    )}

                    <div className="form-group mt-2">
                        <div>
                            <label htmlFor="inputAddress">Số tiền chuyển</label>
                        </div>

                        <span style={{ color: "red" }}>
                            {this.state.sotienErr}
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                this.setState({
                                    sotien: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Nội dung</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                            Hình thức thanh toán phí
                        </label>
                        <select className="form-control">
                            <option>Người nhận trả phí</option>
                            <option>Người gửi trả phí</option>
                        </select>
                    </div>
                    {this.state.reqOtp ? (
                        <div className="mt-2">
                            <div className="alert alert-danger" role="alert">
                                Nhập mã OTP để xác nhận giao dịch.
                            </div>
                            <div className="form-inline">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input className="form-control" />
                                </div>
                                <button className="btn btn-danger mb-2">
                                    Xác nhận
                                </button>
                                <button className="btn btn-warning btn-sm ml-3 mb-2">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="d-flex justify-content-center mt-2">
                        <button type="submit" className="btn btn-primary">
                            Chuyển tiền
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Noibo;
