import React, { Component } from "react";
import Noibo from "./TransferScreens/Noibo";
import LienNh from "./TransferScreens/LienNh";
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: true,
        };
    }
    changeClass = () => {
        this.setState({
            class: !this.state.class,
        });
    };
    render() {
        let main;
        if (this.state.class) main = <Noibo />;
        else main = <LienNh />;
        return (
            <div>
                <h4>Chuyển khoản</h4>
                <div className="d-flex justify-content-around">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input
                            type="radio"
                            name="ChuyenKhoanNoiBo"
                            id="ChuyenKhoanNoiBo"
                            className="custom-control-input"
                            checked={this.state.class}
                            onChange={() => this.changeClass()}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="ChuyenKhoanNoiBo"
                        >
                            Chuyển khoản Nội bộ
                        </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input
                            type="radio"
                            name="ChuyenKhoanLienNganHang"
                            id="ChuyenKhoanLienNganHang"
                            className="custom-control-input"
                            checked={!this.state.class}
                            onChange={() => this.changeClass()}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="ChuyenKhoanLienNganHang"
                        >
                            Chuyển khoản Liên ngân hàng
                        </label>
                    </div>
                </div>
                <hr />
                <div className="container mt-3">{main}</div>
            </div>
        );
    }
}

export default Transfer;
