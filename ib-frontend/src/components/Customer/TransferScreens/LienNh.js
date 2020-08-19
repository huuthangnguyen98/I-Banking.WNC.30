import React, { Component } from "react";
import { connect } from "react-redux";
import { defaultBank } from "../../../constants/config";
import * as CustomerActions from "../../../actions/CustomerActions";
//import apiCaller from "../../../utils/apiCaller";
//import { checkAccountValid } from "../"
import thousandify from "thousandify";
import * as config from "../../../constants/config";
import callApi from "../../../utils/apiCaller";
import * as Actions from "../../../actions/index";
class LienNh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: true,
      // reqOtp: false,
      ngNhan: "",
      ngNhanErr: "",
      sotien: 0,
      sotienErr: "",
      bank: "",
      confirmed: false,
      nameRe: "",
    };
  }

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
    const token = localStorage.getItem("token");
    //
    this.props.on_showSpinner();
    //
    return callApi(
      "account/info",
      "POST",
      {
        account_number: this.state.ngNhan,
        account_bank: this.refs.bankSelect.value,
      },
      token
    ).then((res) => {
      //
      this.props.on_hideSpinner();
      //
      if (res.data.code !== 0) {
        alert("Số tài khoản không hợp lệ/ không tồn tại.");
        this.setState({
          confirmed: false,
        });
      } else {
        this.setState({
          confirmed: true,
          nameRe: res.data.data.account_name,
        });
      }
    });
  };

  checkValidAccount = (id, trans, account_bank) => {
    this.props.on_showSpinner();
    const token = localStorage.getItem("token");
    return callApi(
      "account/info",
      "POST",
      { account_number: id, account_bank },
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

    var to_account_number, account_bank;
    if (this.state.class) {
      to_account_number =
        listRe_show[this.refs.chonNguoiNhan.selectedIndex]
          .receiver_account_number;
      account_bank =
        listRe_show[this.refs.chonNguoiNhan.selectedIndex].receiver_bank;
    } else {
      to_account_number = this.state.ngNhan;
      account_bank = this.refs.bankSelect.value;
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

    var des = this.refs.des.value;
    if (des === "") des = "none";
    var is_pay_fee = "";
    const fee = this.refs.fee.selectedIndex;
    if (fee === 0) is_pay_fee = false;
    if (fee === 1) is_pay_fee = true;
    const trans = {
      from_account_number,
      to_account_number,
      amount: this.state.sotien,
      description: des,
      from_bank: "30Bank",
      to_bank: account_bank,
      pay_type: 0,
      is_pay_fee,
    };

    if (!error) this.checkValidAccount(to_account_number, trans, account_bank);
  };
  sendReq = (trans) => {
    this.setState({
      reqOtp: true,
    });
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
    const { list, listRe, Partners, UIState } = this.props;
    const listPartners_show = Partners.map((item) => (
      <option key={item.partnerId}>{item.partnerName}</option>
    ));

    const listAccount = list.map((item, index) => (
      <option key={item.account_number}>
        {item.account_number} - Số dư : {thousandify(item.balance)} VNĐ
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
        {
          UIState.otpFrom ? (
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
            // ----
            <form
              onSubmit={(e) => {
                // if (window.confirm("Xác nhận thực hiện giao dịch?"))
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
                    Chọn ngân hàng
                  </label>
                  <select className="form-control mb-2" ref="bankSelect">
                    {listPartners_show}
                  </select>
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
                        Số tiền chuyển <small>(VNĐ)</small>
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

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      Hình thức thanh toán phí
                    </label>
                    <select className="form-control" ref="fee">
                      <option>Người nhận trả phí</option>
                      <option>Người gửi trả phí</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary">
                      Chuyển tiền
                    </button>
                  </div>
                </div>
              ) : null}
            </form>
          )

          // ---
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.listAccount,
    listRe: state.listReceivers,
    Partners: state.Partners,
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
    on_hideSpinner: () => {
      dispatch(Actions.hide_spinner());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LienNh);
