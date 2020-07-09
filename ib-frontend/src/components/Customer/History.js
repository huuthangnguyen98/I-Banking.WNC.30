import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import { connect } from "react-redux";
import * as EmployeeActions from "../../actions/EmployeeActions";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confimed: false,
      name: "",
      type: 0,
      trans_type: 0,
    };
  }
  _confirm = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const id = this.refs.id.value;
    const typ = this.refs.type.selectedIndex;
    var type;
    if (typ === 0) type = 4; //all
    if (typ === 1) type = 3; // payin
    if (typ === 2) type = 1; // transfer
    if (typ === 3) type = 2; // debt

    // console.log(type);
    this.props.onGetHistory(id, type);
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
            trans_type: type,
          });
        }
      }
    );
  };
  render() {
    const {
      historyPayIn,
      historyTransfer,
      historyDebt,
      allTypesTrans,
      list,
    } = this.props;
    const listAccount = list.map((item, index) => (
      <option key={item.account_number}>{item.account_number}</option>
    ));
    let account_info, table, listPayIn, listTransfer, listDebt, listAllTrans;
    if (this.state.confimed) {
      account_info = (
        <div>
          <h5>Thông tin tài khoản</h5>
          <table className="table table-borderless table-sm">
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
      listAllTrans = allTypesTrans.map((item) => {
        if (item.type === 1)
          return (
            <tr className="table-primary" key={item.transaction_id}>
              <td>
                <span className="badge badge-pill badge-success">
                  chuyển khoản
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{item.amount}</td>
              <td>{item.created_at}</td>
            </tr>
          );
        if (item.type === 2)
          return (
            <tr className="table-primary" key={item.transaction_id}>
              <td>
                <span className="badge badge-pill badge-warning">
                  thanh toán nợ
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{item.amount}</td>
              <td>{item.created_at}</td>
            </tr>
          );
        if (item.type === 3) {
          if (item.from_account_number !== null)
            return (
              <tr className="table-primary" key={item.transaction_id}>
                <td>
                  <span className="badge badge-pill badge-info">nhận tiền</span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{item.amount}</td>
                <td>{item.created_at}</td>
              </tr>
            );
          else
            return (
              <tr className="table-primary" key={item.transaction_id}>
                <td>
                  <span className="badge badge-pill badge-secondary">
                    nạp tiền
                  </span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{item.amount}</td>
                <td>{item.created_at}</td>
              </tr>
            );
        }
      });

      listDebt = historyDebt.map((item) => (
        <tr className="table-primary" key={item.transaction_id}>
          <td>
            <span className="badge badge-pill badge-warning">
              thanh toán nợ
            </span>
          </td>
          <td>{item.from_account_number}</td>
          <td>{item.to_account_number}</td>
          <td>{item.amount}</td>
          <td>{item.created_at}</td>
        </tr>
      ));
      listTransfer = historyTransfer.map((item) => (
        <tr className="table-primary" key={item.transaction_id}>
          <td>
            <span className="badge badge-pill badge-success">chuyển khoản</span>
          </td>
          <td>{item.from_account_number}</td>
          <td>{item.to_account_number}</td>
          <td>{item.amount}</td>
          <td>{item.created_at}</td>
        </tr>
      ));
      listPayIn = historyPayIn.map((item) => {
        if (item.from_account_number !== null) {
          return (
            <tr className="table-primary" key={item.transaction_id}>
              <td>
                <span className="badge badge-pill badge-info">nhận tiền</span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{item.amount}</td>
              <td>{item.created_at}</td>
            </tr>
          );
        } else {
          return (
            <tr className="table-primary" key={item.transaction_id}>
              <td>
                <span className="badge badge-pill badge-secondary">
                  nạp tiền
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{item.amount}</td>
              <td>{item.created_at}</td>
            </tr>
          );
        }
      });

      switch (this.state.trans_type) {
        case 1:
          table = (
            <div>
              <h5>Lịch sử chuyển khoản</h5>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Loại</th>
                    <th scope="col">Gửi</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Thời gian</th>
                  </tr>
                </thead>
                <tbody>{listTransfer}</tbody>
              </table>
            </div>
          );
          break;
        case 2:
          table = (
            <div>
              <h5>Lịch sử thanh toán nợ</h5>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Loại</th>
                    <th scope="col">Gửi</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Thời gian</th>
                  </tr>
                </thead>
                <tbody>{listDebt}</tbody>
              </table>
            </div>
          );
          break;
        case 3:
          table = (
            <div>
              <h5>Lịch sử nhận tiền</h5>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Loại</th>
                    <th scope="col">Gửi</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Thời gian</th>
                  </tr>
                </thead>
                <tbody>{listPayIn}</tbody>
              </table>
            </div>
          );
          break;
        case 4:
          table = (
            <div>
              <h5>Lịch sử giao dịch</h5>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th scope="col">Loại</th>
                    <th scope="col">Gửi</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Thời gian</th>
                  </tr>
                </thead>
                <tbody>{listAllTrans}</tbody>
              </table>
            </div>
          );
        default:
      }
    } else {
      account_info = null;
      table = null;
    }
    return (
      <div>
        <form onSubmit={(e) => this._confirm(e)}>
          <div className="form-row">
            <div className="form-group col col-sm-6">
              <select className="form-control" ref="id">
                {listAccount}
              </select>
            </div>
            <div className="form-group col col-sm-3">
              <select className="custom-select" ref="type">
                <option defaultValue="4">Tất cả</option>
                <option defaultValue="1">Nhận tiền</option>
                <option defaultValue="2">Chuyển khoản</option>
                <option defaultValue="3">Thanh toán nợ</option>
              </select>
            </div>
            <div className="form-group col col-sm-2">
              <button type="submit" className="btn btn-primary">
                Tra cứu
              </button>
            </div>
          </div>
        </form>

        {account_info}
        <div style={{ fontSize: "15px" }}>{table}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyPayIn: state.historyPayIn,
    historyTransfer: state.historyTransfer,
    historyDebt: state.historyDebt,
    allTypesTrans: state.allTypesTrans,
    list: state.listAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHistory: (id, type) => {
      dispatch(EmployeeActions.getHistoryReq(id, type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
