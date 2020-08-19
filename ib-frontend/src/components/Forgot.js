import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as CustomerActions from "../actions/CustomerActions";
import callApi from "../utils/apiCaller";
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: false,
      sendEmail: 1,
      email: "",
      btnMsg: "Tiếp tục",
    };
  }
  handleInput = (e) => {
    e.preventDefault();
    const email = this.refs.email.value;
    this.sendEmail(email);
  };
  sendEmail = (email) => {
    this.setState({
      btnMsg: "Đang xử lí",
    });
    return callApi("user/forgot-password", "POST", { email: email }).then(
      (res) => {
        if (res.data.code === 0) {
          const clemail = this.refs.email.value;
          this.refs.email.value = "";
          this.setState({
            sendEmail: 0,
            email: clemail,
          });
        } else {
          this.setState({
            btnMsg: "Tiếp tục",
          });
          alert("Email không hợp lệ. Vui lòng thử lại");
        }
      }
    );
  };
  handleOtp = (e) => {
    e.preventDefault();
    const otp = this.refs.otp.value;
    const email = this.state.email;
    const newpw = this.refs.newpw.value;
    this.props.onSendOtp(email, otp, newpw);
  };
  render() {
    if (this.state.errMsg)
      var wrongHandle = (
        <div className="alert alert-danger alert-sm" role="alert">
          Email không tồn tại/ chưa đăng kí dịch vụ I-banking.
        </div>
      );
    if (this.state.sendEmail === 0) {
      var main = (
        <form onSubmit={(e) => this.handleOtp(e)}>
          <span>{this.state.email}</span>
          <div className="form-group mt-1">
            <label>Kiểm tra email và nhập mã OTP</label>
            <input
              className="form-control mb-1"
              placeholder="Mã OTP"
              type="text"
              ref="otp"
            />
            <label>Mật khẩu mới</label>
            <input
              className="form-control"
              placeholder="Mật khẩu mới"
              type="password"
              ref="newpw"
            />
          </div>{" "}
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block"> Xác nhận</button>
          </div>{" "}
        </form>
      );
    } else
      main = (
        <form onSubmit={(e) => this.handleInput(e)}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              placeholder="Địa chỉ email"
              type="email"
              ref="email"
            />
          </div>
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block" ref="btncon">
              {this.state.btnMsg}
            </button>
          </div>
        </form>
      );
    return (
      <div className="col-sm-4 offset-4" style={{ marginTop: "100px" }}>
        <div className="card">
          <article className="card-body">
            <h4 className="card-title mb-4 mt-1">Quên mật khẩu</h4>
            {wrongHandle}

            {main}
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
          </article>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSendOtp: (email, otp, newpw) => {
      dispatch(CustomerActions.sendOtp(email, otp, newpw));
    },
  };
};

export default connect(null, mapDispatchToProps)(Forgot);
