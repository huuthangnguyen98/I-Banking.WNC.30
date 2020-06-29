import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Link } from "react-router-dom";
// import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
class Login extends Component {
    constructor(props) {
        super(props);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            recaptchaToken: "",
        };
    }
    handleInput = (e) => {
        e.preventDefault();
        const username = this.refs.username.value;
        const pwd = this.refs.pwd.value;
        //if (this.state.recaptchaToken !== "") this.props.onLogin(username, pwd);
        this.props.onLogin(username, pwd);
    };
    // componentDidMount() {
    //     loadReCaptcha();
    //     if (this.captchaDemo) {
    //         console.log("started, just a second...");
    //         this.captchaDemo.reset();
    //     }
    // }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }
    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!
        console.log(recaptchaToken, "<= your recaptcha token");
        this.setState({
            recaptchaToken: recaptchaToken,
        });
    }

    render() {
        return (
            <div className="col-sm-4 offset-4" style={{ marginTop: "100px" }}>
                <div className="card">
                    <article className="card-body">
                        <h4 className="card-title mb-4 mt-1">Đăng nhập</h4>

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
                            <div className="form-group">
                                <Link
                                    className="float-right"
                                    to="/forgot"
                                    style={{ textDecoration: "none" }}
                                >
                                    Quên mật khẩu?
                                </Link>
                                <label>Mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    ref="pwd"
                                />
                            </div>{" "}
                            {/* <ReCaptcha
                                ref={(el) => {
                                    this.captchaDemo = el;
                                }}
                                size="normal"
                                data-theme="dark"
                                render="explicit"
                                sitekey="6Lcl2KUZAAAAAMUlnRJqmHWUQdGLJdnauXabPXzD"
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                                hl="vi"
                            /> */}
                            <div className="form-group mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
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
    };
};
export default connect(null, mapDispatchToProps)(Login);
