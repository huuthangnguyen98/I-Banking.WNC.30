import React, { Component } from "react";
import { connect } from "react-redux";
import { defaultBank } from "../../../constants/config";
import * as CustomerActions from "../../../actions/CustomerActions";
import callApi from "../../../utils/apiCaller";
import thousandify from "thousandify";
import * as config from "../../../constants/config";
import * as Actions from "../../../actions/index";
class Noibo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: true,
      ngNhan: "",
      ngNhanErr: "",
      sotien: 0,
      sotienErr: "",
      confirmed: false,
      nameRe: "",
    };
  }
  // done herre
  componentWillUnmount() {
    this.props.onToogle_otpFrom(false);
  }
  changeClass = () => {
    this.setState({
      class: !this.state.class,
      confirmed: false,
    });
  };

  _validate = () => {
    console.log("checking");
    const token = localStorage.getItem("token");
    return callApi(
      "account/info",
      "POST",
      {
        account_number: this.state.ngNhan,
        account_bank: config.defaultBank,
      },
      token
    ).then((res) => {
      if (res.data.code !== 0) {
        alert("Số tài khoản không hợp lệ/ không tồn tại.");
        this.setState({
          confirmed: false,
        });
      } else {
        // console.log(res.data.data);
        this.setState({
          confirmed: true,
          nameRe: res.data.data.account_name,
        });
      }
    });
  };

  checkValidAccount = (id, trans) => {
    this.props.on_showSpinner();
    const token = localStorage.getItem("token");
    return callApi(
      "account/info",
      "POST",
      { account_number: id, account_bank: config.defaultBank },
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
    e.preventDefault();
    if (!window.confirm("Xác nhận thực hiện giao dịch?")) return null;
    let error = false;

    if (this.state.ngNhan === "" && this.state.class === false) {
      this.setState({
        ngNhanErr: "Bạn cần nhập số tài khoản người nhận",
      });
      error = true;
    }

    const { list, listRe } = this.props;
    const listRe_show = listRe.filter(
      (item) => item.receiver_bank === defaultBank
    );

    var to_account_number;
    if (this.state.class) {
      to_account_number =
        listRe_show[this.refs.chonNguoiNhan.selectedIndex]
          .receiver_account_number;
    } else {
      to_account_number = this.state.ngNhan;
    }

    const balance = list[this.refs.account.selectedIndex].balance;
    const from_account_number =
      list[this.refs.account.selectedIndex].account_number;
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
    //
    if (
      this.state.class === false &&
      this.state.ngNhan.toString() === from_account_number.toString()
    ) {
      this.setState({
        ngNhanErr: "Tài khoản nhận không hợp lệ!",
      });
      error = true;
    }
    //
    const des = this.refs.des.value;
    const trans = {
      from_account_number,
      to_account_number,
      amount: this.state.sotien,
      description: des,
      from_bank: "30Bank",
      to_bank: "30Bank",
      pay_type: 0,
    };
    if (!error) {
      this.setState({
        ngNhan: "",
        ngNhanErr: "",
        sotienErr: "",
      });
      this.checkValidAccount(to_account_number, trans);
    }
  };
  sendReq = (trans) => {
    this.props.onSendOtpTransfer(trans);
  };
  _conirmTransfer = () => {
    const otp = this.refs.otp.value;

    if (otp !== "") this.props.onConfirmTransfer(otp);
  };
  _cancelTransfer = () => {
    this.props.onToogle_otpFrom(false);
  };
  render() {
    const { list, listRe, UIState } = this.props;
    const listAccount = list.map((item, index) => (
      <option key={item.account_number}>
        {item.account_number} - Số dư : {thousandify(item.balance)} VNĐ
      </option>
    ));
    const listRe_show = listRe
      .filter((item) => item.receiver_bank === defaultBank)
      .map((item, index) => (
        <option key={item.receiver_account_number}>
          {item.receiver_account_number} - {item.receiver_name} -{" "}
          {item.receiver_bank}
        </option>
      ));
    return (
      <div>
        {UIState.otpFrom ? (
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
                className="btn btn-warning ml-3 mb-2"
                onClick={() => this._cancelTransfer()}
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          // ---

          <form
            onSubmit={(e) => {
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
                <label className="custom-control-label" htmlFor="trongList">
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
                <label className="custom-control-label" htmlFor="ngoaiList">
                  Nhập số tài khoản
                </label>
              </div>
            </div>
            {this.state.class ? (
              <div>
                <label htmlFor="exampleFormControlSelect1">
                  Chọn người nhận
                </label>
                <select className="form-control" ref="chonNguoiNhan">
                  {listRe_show}
                </select>
              </div>
            ) : (
              <div className="form-group mt-2">
                <label htmlFor="exampleFormControlSelect1">
                  Nhập số tài khoản
                </label>
                <span style={{ color: "red" }}>{this.state.ngNhanErr}</span>
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
                <div className="d-flex justify-content-center mt-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this._validate()}
                  >
                    Kiểm tra
                  </button>
                </div>

                {this.state.confirmed ? (
                  <div className="container mt-2">
                    <div
                      className="row  p-2 rounded"
                      style={{ backgroundColor: "#FFA07A" }}
                    >
                      <div className="col col-sm-4">Người nhận :</div>
                      <div className="col col-sm-8">{this.state.nameRe}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {this.state.confirmed || this.state.class ? (
              <div>
                <div className="form-group mt-2">
                  <div>
                    <label htmlFor="inputAddress">
                      Số tiền chuyển (<small>VNĐ</small>)
                    </label>
                  </div>
                  <span style={{ color: "red" }}>{this.state.sotienErr}</span>
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
                <div className="d-flex justify-content-center mt-2">
                  <button type="submit" className="btn btn-primary">
                    Chuyển tiền
                  </button>
                </div>
              </div>
            ) : null}
          </form>

          // ---
        )}
        {/* --- */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.listAccount,
    listRe: state.listReceivers,
    UIState: state.UIState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSendOtpTransfer: (trans) => {
      dispatch(CustomerActions.sendOtpTransfer(trans));
    },
    onConfirmTransfer: (otp) => {
      dispatch(CustomerActions.confirmTransfer(otp));
    },
    onToogle_otpFrom: (status) => {
      dispatch(CustomerActions.toogleUI_otpFrom(status));
    },
    on_showSpinner: () => {
      dispatch(Actions.show_spinner());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Noibo);
