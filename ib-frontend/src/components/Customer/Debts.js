import React, { Component } from "react";
import { connect } from "react-redux";
import AddDebt from "../../containers/Customer/AddDebt";
import ShowUnpaid from "./ShowUnpaid";
import * as CustomerActions from "../../actions/CustomerActions";
import thousandify from "thousandify";
import Pagination from "react-js-pagination";
import * as Actions from "../../actions/index";
class Debts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage_byUser: 1,
      activePage_toUser: 1,
      toId: 0,
      toAmount: 0,
    };
  }
  setInfoPayBack = (id, amount) => {
    this.setState({
      toId: id,
      toAmount: amount,
    });
  };
  //
  handlePageChange_byUser(pageNumber) {
    this.setState({ activePage_byUser: pageNumber });
  }
  handlePageChange_toUser(pageNumber) {
    this.setState({ activePage_toUser: pageNumber });
  }
  //
  componentWillUnmount() {
    document.title = "30-BANK";
    this.props.onToogle_otpFrom(false);
  }

  componentDidMount() {
    document.title = "Quản lí nhắc nợ";
    const { listDebtsToUser } = this.props;
    if (listDebtsToUser.length === 0) this.props.on_showSpinner();
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
      self.props.onCancelDebtByUser(id, des);
    }
  };
  _onCancelDebtToUser = (id) => {
    const self = this;

    var des = prompt("Nội dung hủy nhắc nợ:");
    if (des !== null) {
      self.props.onCancelDebtToUser(id, des);
    }
  };
  _onPayback = (id) => {
    window.scroll(0, 0);
    this.props.onsendOtpPayDebt(id);
  };
  _conirmTransfer = () => {
    const otp = this.refs.otp.value;
    if (otp !== "") this.props.onConfirmTransfer(otp);
  };
  _cancelTransfer = () => {
    this.props.onToogle_otpFrom(false);
  };
  show_detailDebt = (id) => {
    const self = this;
    self.props.on_fetchDebtDetail(id);
  };
  render() {
    const { listDebtsByUser, listDebtsToUser, UIState } = this.props;
    //
    const startPage_byUser = (this.state.activePage_byUser - 1) * 5;
    const endPage_byUser = startPage_byUser + 5;
    //
    const listDebtsByUser_show = listDebtsByUser
      .slice(startPage_byUser, endPage_byUser)
      .map((item) => {
        if (item.status === 0)
          return (
            //Paid
            <tr key={item.debtor_id}>
              <td>
                <span className="badge badge-pill badge-success">đã trả</span>
              </td>
              <th scope="row">{item.debtor_account_number}</th>
              <td>{thousandify(item.amount)}</td>
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
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
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
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
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
                >
                  Chi tiết
                </button>

                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => this._onCancelDebtByUser(item.debtor_id)}
                  style={{ fontSize: "12px" }}
                >
                  Hủy
                </button>
              </td>
            </tr>
          );

        return null;
      });
    //
    const startPage_toUser = (this.state.activePage_toUser - 1) * 5;
    const endPage_toUser = startPage_toUser + 5;
    //

    const listDebtsToUser_show = listDebtsToUser
      .slice(startPage_toUser, endPage_toUser)
      .map((item) => {
        if (item.status === 0)
          return (
            //Paid
            <tr key={item.debtor_id}>
              <td>
                <span className="badge badge-pill badge-success">đã trả</span>
              </td>
              <th scope="row">{item.reveiver_account_number}</th>
              <td>{thousandify(item.amount)}</td>
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
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
              <th scope="row">{item.reveiver_account_number}</th>
              <td>{thousandify(item.amount)}</td>
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
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
              <th scope="row">{item.reveiver_account_number}</th>
              <td>{thousandify(item.amount)}</td>
              <td>{item.debtor_id}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  data-toggle="modal"
                  data-target="#debtDetailComponent"
                  onClick={() => this.show_detailDebt(item.debtor_id)}
                  style={{ fontSize: "12px" }}
                >
                  Chi tiết
                </button>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => this._onCancelDebtToUser(item.debtor_id)}
                  style={{ fontSize: "12px" }}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => {
                    // this.setState({
                    //   toId: item.reveiver_account_number,
                    //   toAmount: item.amount,
                    // });
                    this.setInfoPayBack(
                      item.reveiver_account_number,
                      item.amount
                    );
                    this._onPayback(item.debtor_id);
                  }}
                  style={{ fontSize: "12px" }}
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
          <ShowUnpaid
            listDebtsToUser={this.props.listDebtsToUser}
            _onCancelDebtToUser={this._onCancelDebtToUser}
            _onPayback={this._onPayback}
            show_detailDebt={this.show_detailDebt}
            setInfoPayBack={this.setInfoPayBack}
          />
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
              <th scope="col">Mã</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{listDebtsByUser_show}</tbody>
        </table>
        {/* // */}
        <div className="row justify-content-sm-center">
          <Pagination
            activePage={this.state.activePage_byUser}
            itemsCountPerPage={5}
            totalItemsCount={listDebtsByUser.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange_byUser.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
        {/* // */}
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
              <th scope="col">Mã</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{listDebtsToUser_show}</tbody>
        </table>
        {/* // */}
        <div className="row justify-content-sm-center">
          <Pagination
            activePage={this.state.activePage_toUser}
            itemsCountPerPage={5}
            totalItemsCount={listDebtsToUser.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange_toUser.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
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
      dispatch(CustomerActions.cancelDebt_byUserReq(id, des));
    },
    onCancelDebtToUser: (id, des) => {
      dispatch(CustomerActions.cancelDebt_toUserReq(id, des));
    },
    onToogle_otpFrom: (status) => {
      dispatch(CustomerActions.toogleUI_otpFrom(status));
    },
    onsendOtpPayDebt: (id) => {
      dispatch(CustomerActions.sendOtpPayDebt(id));
    },
    onConfirmTransfer: (otp) => {
      dispatch(CustomerActions.confirmTransfer(otp));
    },
    on_fetchDebtDetail: (id) => {
      dispatch(CustomerActions.fetchDebtDetailReq(id));
    },
    on_showSpinner: () => {
      dispatch(Actions.show_spinner());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Debts);
