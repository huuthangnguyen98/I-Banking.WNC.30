import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import { connect } from "react-redux";
import * as EmployeeActions from "../../actions/EmployeeActions";
class PayIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confimed: false,
      name: "",
      type: 0,
    };
  }

  _confirm = () => {
    const token = localStorage.getItem("token");
    const id = this.refs.id.value;
    callApi("account/info", "POST", { account_number: id }, token).then(
      (res) => {
        if (res.data.code !== 0) {
          alert("Số tài khoản không hợp lệ/ không tồn tại.");
          this.setState({
            confimed: false,
          });
        } else {
          this.setState({
            confimed: true,
            name: res.data.data.account_name,
            type: res.data.data.account_type,
          });
        }
      }
    );
  };
  render() {
    let account_info;
    if (this.state.confimed)
      account_info = (
        <div className="form-row">
          <h4>Thông tin tài khoản</h4>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Họ tên :</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>Loại tài khoản :</td>
                <td>{this.state.type === 1 ? "Thanh toán" : "Tiết kiệm"} </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    else account_info = null;
    return (
      <form>
        <div className="form-row">
          <div className="form-group col col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tên đăng nhập hoặc số tài khoản"
              ref="id"
              readOnly={this.state.confimed}
            />
          </div>
          <div className="form-group col col-sm-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this._confirm()}
            >
              Xác minh
            </button>
          </div>

          {this.state.confimed ? (
            <div className="form-group col col-sm-2">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() =>
                  this.setState({
                    confimed: false,
                  })
                }
              >
                Sửa
              </button>
            </div>
          ) : null}
        </div>
        <div className="form-row">
          <div className="form-group col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Số tiền nạp"
              ref="amount"
            />
          </div>
          {this.state.confimed ? (
            <div className="form-group col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (window.confirm("Xác nhận nạp tiền vào tài khoản?"))
                    this.props.onPayIn(
                      this.refs.id.value,
                      this.refs.amount.value
                    );
                }}
              >
                Xác nhận
              </button>
            </div>
          ) : null}
        </div>

        <div className="container">{account_info}</div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPayIn: (id, amount) => {
      dispatch(EmployeeActions.payIn(id, amount));
    },
  };
};

export default connect(null, mapDispatchToProps)(PayIn);
