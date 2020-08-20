import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Link } from "react-router-dom";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
class Login extends Component {
  constructor(props) {
    super(props);
    // Auto-login
    // const token = localStorage.getItem("token");
    // if (token) this.props.onLoginWithToken(token);
    //--------
    //-----
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      recaptchaToken: "",
      errCaptcha: false,
    };
  }
  handleInput = (e) => {
    e.preventDefault();
    const username = this.refs.username.value;
    const pwd = this.refs.pwd.value;
    if (this.state.recaptchaToken !== "") this.props.onLogin(username, pwd);
    else
      this.setState({
        errCaptcha: true,
      });

    // Disable recaptcha
    //   this.props.onLogin(username, pwd);
  };
  componentDidMount() {
    loadReCaptcha();
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    this.setState({
      recaptchaToken: recaptchaToken,
    });
  }

  render() {
    if (this.props.wrongLogging)
      var wrongHandle = (
        <div className="alert alert-danger alert-sm" role="alert">
          Bạn nhập sai Số điện thoại/ mật khẩu. Mời nhập lại
        </div>
      );
    return (
      <div className="col-sm-4 offset-4" style={{ marginTop: "100px" }}>
        <div className="card">
          <article className="card-body">
            <h4 className="card-title mb-4 mt-1">Đăng nhập</h4>
            {wrongHandle}
            <form onSubmit={(e) => this.handleInput(e)}>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  placeholder="Số điện thoại"
                  type="text"
                  ref="username"
                />
              </div>{" "}
              <div className="form-group">
                <Link
                  className="float-right"
                  to="/forgot"
                  style={{ textDecoration: "none" }}
                >
                  Quên mật khẩu?
                </Link>
                <label>Mật khẩu</label>
                <input className="form-control" type="password" ref="pwd" />
              </div>{" "}
              {this.state.errCaptcha ? (
                <i
                  className="fa fa-info-circle mr-1"
                  aria-hidden="true"
                  style={{ color: "red" }}
                >
                  <small> Mã captcha không đúng</small>
                </i>
              ) : null}
              <ReCaptcha
                ref={(el) => {
                  this.captchaDemo = el;
                }}
                size="normal"
                data-theme="dark"
                render="explicit"
                sitekey="6Ld1KrcZAAAAADtB1Fq9741cXlF3pCbng9YcO5IW"
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
                hl="vi"
              />
              <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Đăng nhập
                </button>
              </div>{" "}
            </form>
          </article>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, pwd) => {
      dispatch(actions.login(username, pwd));
    },
    onLoginWithToken: (token) => {
      dispatch(actions.loginWithToken(token));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    wrongLogging: state.Auth.wrongLogging,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
