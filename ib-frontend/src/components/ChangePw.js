import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
class ChangePw extends Component {
  handleInput = (e) => {
    e.preventDefault();
    let err = false;
    const oldpw = this.refs.oldpw.value;
    const newpw1 = this.refs.newpw1.value;
    const newpw2 = this.refs.newpw2.value;
    if (oldpw === "" || newpw1 === "" || newpw2 === "") {
      err = true;
      alert("Vui lòng nhập đầy đủ thông tin");
    }

    if (newpw1 !== newpw2) {
      err = true;
      alert("Mật khẩu xác nhận không khớp!");
    }
    if (!err) this.props.onChangePw(oldpw, newpw1);
  };
  render() {
    return (
      <div className="col-sm-6 offset-3" style={{ marginTop: "50px" }}>
        <div className="card">
          <article className="card-body">
            <h4 className="card-title mb-4 mt-1">Thay đổi mật khẩu</h4>

            <form onSubmit={(e) => this.handleInput(e)}>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input className="form-control" type="password" ref="oldpw" />
                <label>Mật khẩu mới</label>
                <input className="form-control" type="password" ref="newpw1" />
                <label>Xác nhận mật khẩu mới</label>
                <input className="form-control" type="password" ref="newpw2" />
              </div>{" "}
              <div className="form-group mt-2">
                <button className="btn btn-primary btn-block"> Thay đổi</button>
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
    onChangePw: (oldpw, newpw) => {
      dispatch(actions.changePw(oldpw, newpw));
    },
  };
};

export default connect(null, mapDispatchToProps)(ChangePw);
