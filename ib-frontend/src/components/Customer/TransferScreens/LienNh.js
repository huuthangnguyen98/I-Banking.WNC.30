import React, { Component } from "react";
import { connect } from "react-redux";
import { defaultBank } from "../../../constants/config";
import * as CustomerActions from "../../../actions/CustomerActions";
import { loginWithToken } from "../../../actions";
//import apiCaller from "../../../utils/apiCaller";
//import { checkAccountValid } from "../"
import callApi from "../../../utils/apiCaller";
class LienNh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: true,
            reqOtp: false,
            ngNhan: "",
            ngNhanErr: "",
            sotien: 0,
            sotienErr: "",
        };
    }
    changeClass = () => {
        this.setState({
            class: !this.state.class,
        });
    };
    checkValidAccount = (id, trans) => {
        const token = localStorage.getItem("token");
        return callApi(
            "account/info",
            "POST",
            { account_number: id },
            token
        ).then((res) => {
            if (res.data.code !== 0) {
                alert("Số tài khoản không hợp lệ/ không tồn tại.");
            } else {
                this.sendReq(trans);
            }
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

        const { list, listRe } = this.props;
        const listRe_show = listRe.filter(
            (item) => item.receiver_bank !== defaultBank
        );
        //console.log(listRe_show);

        var to_account_number;
        if (this.state.class) {
            to_account_number =
                listRe_show[this.refs.chonNguoiNhan.selectedIndex]
                    .receiver_account_number;
        } else {
            to_account_number = this.state.ngNhan;
        }
        console.log(to_account_number);

        const balance = list[this.refs.account.selectedIndex].balance;
        const from_account_number =
            list[this.refs.account.selectedIndex].account_number;
        //console.log(from_account_number);
        // const to_account_number = listRe_show
        //console.log(act);

        // const token = localStorage.getItem("token");
        // callApi(
        //     "account/info",
        //     "POST",
        //     { account_number: to_account_number },
        //     token
        // ).then((res) => {
        //     if (res.data.code !== 0) {
        //         alert("Số tài khoản không hợp lệ/ không tồn tại.");
        //         error = true;
        //     } else {
        //     }
        // });

        if (
            this.state.sotien === 0 ||
            typeof this.state.sotien !== "number" ||
            this.state.sotien > balance
        ) {
            this.setState({
                sotienErr: "Vui lòng nhập số tiền hợp lệ",
            });
            error = true;
        }
        //console.log(typeof this.state.sotien);
        //console.log(typeof balance);

        const des = this.refs.des.value;
        // console.log(this.refs.account.value);
        const trans = {
            from_account_number,
            to_account_number,
            amount: this.state.sotien,
            description: des,
            from_bank: "30Bank",
            to_bank: "30Bank",
            pay_type: 0,
        };
        //console.log(trans);
        //console.log(error);

        // if (!error) this.sendReq(trans);
        if (!error) this.checkValidAccount(to_account_number, trans);
    };
    sendReq = (trans) => {
        this.setState({
            reqOtp: true,
        });
        console.log("Nhap OTP");
        this.props.onSendOtpTransfer(trans);
    };
    _conirmTransfer = () => {
        //console.log("confrim transfer");
        const otp = this.refs.otp.value;
        //console.log(otp);

        if (otp !== "") this.props.onConfirmTransfer(otp);
    };
    _cancelTransfer = () => {
        this.setState({
            reqOtp: false,
        });
    };
    render() {
        const { list, listRe } = this.props;
        const listAccount = list.map((item, index) => (
            <option key={item.account_number}>
                {item.account_number} - Số dư : {item.balance}
            </option>
        ));
        const listRe_show = listRe
            .filter((item) => item.receiver_bank !== defaultBank)
            .map((item, index) => (
                <option key={item.receiver_account_number}>
                    {item.receiver_account_number} - {item.receiver_name} -{" "}
                    {item.receiver_bank}
                </option>
            ));
        return (
            <div>
                {this.state.reqOtp ? (
                    <div className="mt-2">
                        <div className="alert alert-danger" role="alert">
                            Nhập mã OTP để xác nhận giao dịch.
                        </div>
                        <div className="form-inline">
                            <div className="form-group mx-sm-3 mb-2">
                                <input className="form-control" ref="otp" />
                            </div>
                            <button
                                className="btn btn-danger mb-2"
                                onClick={() => this._conirmTransfer()}
                            >
                                Xác nhận
                            </button>
                            <button
                                className="btn btn-warning btn-sm ml-3 mb-2"
                                onClick={() => this._cancelTransfer()}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
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
                        <select className="form-control" ref="account">
                            {listAccount}
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
                            <select
                                className="form-control"
                                ref="chonNguoiNhan"
                            >
                                {listRe_show}
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
                            <label htmlFor="exampleFormControlSelect1">
                                Chọn ngân hàng
                            </label>
                            <select className="form-control">
                                <option>BIDV</option>
                                <option>Sacombank</option>
                            </select>
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
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                                this.setState({
                                    sotien: +e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Nội dung</label>
                        <input type="text" className="form-control" ref="des" />
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

const mapStateToProps = (state) => {
    return {
        list: state.listAccount,
        listRe: state.listReceivers,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // onFetchInfo: () => {
        //     dispatch(CustomerActions.fetchInfo());
        // },
        onSendOtpTransfer: (trans) => {
            dispatch(CustomerActions.sendOtpTransfer(trans));
        },
        onConfirmTransfer: (otp) => {
            dispatch(CustomerActions.confirmTransfer(otp));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LienNh);
