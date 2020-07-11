import React, { Component } from "react";
import { connect } from "react-redux";
import AddDebt from "../../containers/Customer/AddDebt";
import ShowUnpaid from "./ShowUnpaid";
import * as CustomerActions from "../../actions/CustomerActions";
import thousandify from "thousandify";
class Debts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // reqOtp: false,
      des: "",
      created_at: "",
      id: "",
      amount: 0,
      toId: "",
      toAmount: 0,
    };
  }

  componentWillUnmount() {
    this.props.onToogle_otpFrom(false);
  }

  componentDidMount() {
    var self = this;
    self.props.onFetchListDebt_all();
  }
  _onRemove = (id) => {
    const self = this;
    self.props.onRemoveReceiver(id);
  };
  _onChange = (id) => {
    const self = this;

    var name = prompt("Tên gợi nhớ mới :");
    if (name != null) {
      self.props.onChange(id, name);
    }
  };

  _onCancelDebtByUser = (id) => {
    const self = this;

    var des = prompt("Nội dung hủy nhắc nợ:");
    if (des !== null) {
      // window.scroll(0, 0);
      self.props.onCancelDebtByUser(id);
    }
  };
  _onCancelDebtToUser = (id) => {
    const self = this;

    var des = prompt("Nội dung hủy nhắc nợ:");
    if (des !== null) {
      self.props.onCancelDebtToUser(id);
    }
  };
  _onPayback = () => {
    window.scroll(0, 0);
    this.props.onToogle_otpFrom(true);
  };
  _conirmTransfer = () => {
    const otp = this.refs.otp.value;

    if (otp !== "") this.props.onConfirmTransfer(otp);
  };
  _cancelTransfer = () => {
    this.props.onToogle_otpFrom(false);
  };
  render() {
    const { listDebtsByUser, listDebtsToUser, UIState } = this.props;

    const listDebtsByUser_show = listDebtsByUser.map((item) => {
      if (item.status === 0)
        return (
          //Paid
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-success">đã trả</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetail"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      if (item.status === 2)
        return (
          //Canceled
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-secondary">đã hủy</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetail"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      if (item.status === 1)
        return (
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-danger">chưa trả</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetail"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>

              <button
                className="btn btn-danger btn-sm mr-2"
                onClick={() => this._onCancelDebtByUser(item.debtor_id)}
              >
                Hủy
              </button>
            </td>
          </tr>
        );

      return null;
    });

    const listDebtsToUser_show = listDebtsToUser.map((item) => {
      if (item.status === 0)
        return (
          //Paid
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-success">đã trả</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetailToUser"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      if (item.status === 2)
        return (
          //Canceled
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-secondary">đã hủy</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetailToUser"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      if (item.status === 1)
        return (
          <tr key={item.debtor_id}>
            <td>
              <span className="badge badge-pill badge-danger">chưa trả</span>
            </td>
            <th scope="row">{item.debtor_account_number}</th>
            <td>{thousandify(item.amount)}</td>
            <td>
              <button
                className="btn btn-success btn-sm mr-2"
                data-toggle="modal"
                data-target="#debtDetailToUser"
                onClick={() =>
                  this.setState({
                    id: item.debtor_account_number,
                    amount: item.amount,
                    des: item.description,
                    created_at: item.created_at,
                  })
                }
              >
                Chi tiết
              </button>
              <button
                className="btn btn-danger btn-sm mr-2"
                onClick={() => this._onCancelDebtToUser(item.debtor_id)}
              >
                Hủy
              </button>
              <button
                className="btn btn-warning btn-sm mr-2"
                onClick={() => {
                  this.setState({
                    toId: item.debtor_account_number,
                    toAmount: item.amount,
                  });
                  this._onPayback();
                }}
              >
                Thanh toán
              </button>
            </td>
          </tr>
        );

      return null;
    });

    return (
      <div className="container">
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
                className="btn btn-warning btn-sm ml-3 mb-2"
                onClick={() => this._cancelTransfer()}
              >
                Hủy
              </button>
            </div>
            <div>
              Thông tin : trả nợ cho
              <span style={{ color: "red" }}> {this.state.toId} </span>-{" "}
              {thousandify(this.state.toAmount)} <small>VNĐ</small>
            </div>
            <hr />
          </div>
        ) : (
          ""
        )}
        <h5>Tạo nhắc nợ</h5>
        <AddDebt />
        <hr />
        <div>
          <ShowUnpaid listDebtsToUser={this.props.listDebtsToUser} />
        </div>
        <hr />
        <h5>Danh sách nhắc nợ do bản thân tạo</h5>
        <table
          className="table table-sm table-hover"
          style={{ fontSize: "15px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Tình trạng</th>
              <th scope="col">Tài khoản nợ</th>
              <th scope="col">
                Số tiền <small>(VNĐ)</small>
              </th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{listDebtsByUser_show}</tbody>
        </table>
        <hr />
        <h5>Danh sách nhắc nợ được gửi tới</h5>
        <table
          className="table table-sm table-hover"
          style={{ fontSize: "15px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Tình trạng</th>
              <th scope="col">Tài khoản nhắc nợ</th>
              <th scope="col">
                Số tiền <small>(VNĐ)</small>
              </th>

              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{listDebtsToUser_show}</tbody>
        </table>
        {/* Modal to show debt detail by User */}
        <div
          className="modal fade"
          id="debtDetail"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel">
                  Thông tin chi tiết
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div>
                    <span className="badge badge-pill badge-secondary mr-2">
                      TK nợ
                    </span>{" "}
                    {this.state.id}
                  </div>
                  <div>
                    <span className="badge badge-pill badge-warning mr-2">
                      Số tiền
                    </span>{" "}
                    {thousandify(this.state.amount)} <small>VNĐ</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-info mr-2">
                      Nội dung
                    </span>{" "}
                    <small> {this.state.des}</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-success mr-2">
                      Thời gian tạo
                    </span>{" "}
                    <small> {this.state.created_at}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal to show debt detail to User */}
        <div
          className="modal fade"
          id="debtDetailToUser"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel">
                  Thông tin chi tiết
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div>
                    <span className="badge badge-pill badge-secondary mr-2">
                      TK nhắc nợ
                    </span>{" "}
                    {this.state.id}
                  </div>
                  <div>
                    <span className="badge badge-pill badge-warning mr-2">
                      Số tiền
                    </span>{" "}
                    {thousandify(this.state.amount)} <small>VNĐ</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-info mr-2">
                      Nội dung
                    </span>{" "}
                    <small> {this.state.des}</small>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-success mr-2">
                      Thời gian tạo
                    </span>{" "}
                    <small> {this.state.created_at}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDebtsByUser: state.listDebtsByUser,
    listDebtsToUser: state.listDebtsToUser,
    UIState: state.UIState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchListDebt_all: () => {
      dispatch(CustomerActions.fetchListDebts_allReq());
    },
    onCancelDebtByUser: (id, des) => {
      dispatch(CustomerActions.cancelDebt_byUser(id));
    },
    onCancelDebtToUser: (id, des) => {
      dispatch(CustomerActions.cancelDebt_toUser(id));
    },
    onToogle_otpFrom: (status) => {
      dispatch(CustomerActions.toogleUI_otpFrom(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Debts);
