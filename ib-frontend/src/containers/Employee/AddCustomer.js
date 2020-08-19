import React, { Component } from "react";
import * as EmployeeActions from "../../actions/EmployeeActions";
import { connect } from "react-redux";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: [],
    };
  }
  handleInput = (e) => {
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
    if (l.length === 0) {
      const customer = {
        fullname: this.refs.name.value,
        password: this.refs.pw.value,
        email: this.refs.email.value,
        phone: this.refs.phone.value,
      };
      this.props.onAddCustomer(customer);
    }
  };
  render() {
    const listerr = this.state.errMsg.map((item, index) => (
      <div key={index} className="alert alert-danger alert-sm" role="alert">
        <small>{item.text}</small>
      </div>
    ));
    return (
      <form
        onSubmit={(e) => {
          if (window.confirm("Xác nhận Tạo tài khoản?")) this.handleInput(e);
        }}
      >
        {listerr}
        <div className="form-row">
          <div className="form-group col-sm-8">
            <label htmlFor="inputCity">Email</label>
            <input type="email" className="form-control" ref="email" />
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="inputZip">Số điện thoại</label>
            <input type="number" className="form-control" ref="phone" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Họ tên</label>
            <input type="text" className="form-control" ref="name" />
          </div>
          <div className="form-group col-md-6">
            <label>Mật khẩu</label>
            <input type="password" className="form-control" ref="pw" />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Tạo tài khoản
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCustomer: (customer) => {
      dispatch(EmployeeActions.createCustomer(customer));
    },
  };
};
export default connect(null, mapDispatchToProps)(AddCustomer);
