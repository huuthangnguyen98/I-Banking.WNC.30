import React, { Component } from "react";
import { connect } from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: [],
    };
  }
  _addEmp = (e) => {
    e.preventDefault();
    this.setState({
      errMsg: [],
    });
    const l = [];
    if (this.refs.email.value === "") l.push({ text: "Vui lòng nhập email" });
    if (this.refs.phone.value === "")
      l.push({ text: "Vui lòng nhập Số điện thoại" });
    if (this.refs.name.value === "") l.push({ text: "Vui lòng nhập Họ tên" });
    if (this.refs.pw.value === "") l.push({ text: "Vui lòng nhập Mật khẩu" });

    this.setState({
      errMsg: l,
    });
    const full_name = this.refs.name.value;
    const email = this.refs.email.value;
    const phone = this.refs.phone.value;
    const pw = this.refs.pw.value;
    const emp = { full_name, email, phone, pw };

    if (l.length === 0) {
      this.refs.name.value = "";
      this.refs.email.value = "";
      this.refs.phone.value = "";
      this.refs.pw.value = "";
      this.props.onAddEmployee(emp);
    }
  };
  render() {
    const listerr = this.state.errMsg.map((item, index) => (
      <div key={index} className="alert alert-danger alert-sm" role="alert">
        <small>{item.text}</small>
      </div>
    ));
    return (
      <div className="container">
        <h4>Thêm nhân viên</h4>
        <form
          onSubmit={(e) => {
            if (window.confirm("Xác nhận thêm nhân viên?")) this._addEmp(e);
          }}
          style={{ fontSize: "15px" }}
        >
          {listerr}
          <div className="form-row">
            <div className="form-group col">
              <input
                type="number"
                className="form-control"
                placeholder="Số điện thoại"
                ref="phone"
              />
            </div>
            <div className="form-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Họ và tên"
                ref="name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-8">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                ref="email"
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                placeholder="Mật khẩu"
                ref="pw"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Thêm nhân viên
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEmployee: (emp) => {
      dispatch(AdminActions.addEmployeeReq(emp));
    },
  };
};
export default connect(null, mapDispatchToProps)(AddEmployee);
// end here
