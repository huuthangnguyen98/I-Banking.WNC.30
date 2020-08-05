import React, { Component } from "react";
import { connect } from "react-redux";
import thousandify from "thousandify";
import HistoryDetail from "../Customer/HistoryDetail";
import Pagination from "react-js-pagination";
class Tranx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // confimed: false,
      // name: "",
      // type: 0,
      // trans_type: 0,
      //
      activePage_to: 1,
      activePage_from: 1,
      //
      transfer: {},
    };
  }

  handlePageChange_to(pageNumber) {
    this.setState({ activePage_to: pageNumber });
  }
  handlePageChange_from(pageNumber) {
    this.setState({ activePage_from: pageNumber });
  }

  showTranser = (item) => {
    this.setState({
      transfer: item,
    });
  };
  render() {
    const { statistic } = this.props;
    const list_transaction_to = statistic.list_transaction_to;
    const list_transaction_from = statistic.list_transaction_from;

    ////////////////////////////////////////////
    const itemsCountPerPage_from = 10;
    const startPage_from =
      (this.state.activePage_from - 1) * itemsCountPerPage_from;
    const endPage_from = startPage_from + itemsCountPerPage_from;
    ///////////////////////////////////////////

    const list_transaction_from_show = list_transaction_from
      .slice(startPage_from, endPage_from)
      .map((item) => {
        if (item.type === 1)
          return (
            <tr
              className="table-primary"
              key={item.transaction_id}
              data-toggle="modal"
              data-target="#historyDetailComponent"
              onClick={() => this.showTranser(item)}
            >
              <td>
                <span className="badge badge-pill badge-success">
                  chuyển khoản
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{thousandify(item.amount)}</td>
              <td>{item.created_at}</td>
              <td>{item.transaction_id}</td>
            </tr>
          );
        if (item.type === 2)
          return (
            <tr
              className="table-primary"
              key={item.transaction_id}
              data-toggle="modal"
              data-target="#historyDetailComponent"
              onClick={() => this.showTranser(item)}
            >
              <td>
                <span className="badge badge-pill badge-warning">
                  thanh toán nợ
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{thousandify(item.amount)}</td>
              <td>{item.created_at}</td>
              <td>{item.transaction_id}</td>
            </tr>
          );
        if (item.type === 3) {
          if (item.from_account_number !== null)
            return (
              <tr
                className="table-primary"
                key={item.transaction_id}
                data-toggle="modal"
                data-target="#historyDetailComponent"
                onClick={() => this.showTranser(item)}
              >
                <td>
                  <span className="badge badge-pill badge-info">nhận tiền</span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{thousandify(item.amount)}</td>
                <td>{item.created_at}</td>
                <td>{item.transaction_id}</td>
              </tr>
            );
          else
            return (
              <tr
                className="table-primary"
                key={item.transaction_id}
                data-toggle="modal"
                data-target="#historyDetailComponent"
                onClick={() => this.showTranser(item)}
              >
                <td>
                  <span className="badge badge-pill badge-secondary">
                    nạp tiền
                  </span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{thousandify(item.amount)}</td>
                <td>{item.created_at}</td>
                <td>{item.transaction_id}</td>
              </tr>
            );
        }
        return null;
      });

    ////////////////////////////////////////////
    const itemsCountPerPage_to = 10;
    const startPage_to = (this.state.activePage_to - 1) * itemsCountPerPage_to;
    const endPage_to = startPage_to + itemsCountPerPage_to;
    ///////////////////////////////////////////

    const list_transaction_to_show = list_transaction_to
      .slice(startPage_to, endPage_to)
      .map((item) => {
        if (item.type === 1)
          return (
            <tr
              className="table-primary"
              key={item.transaction_id}
              data-toggle="modal"
              data-target="#historyDetailComponent"
              onClick={() => this.showTranser(item)}
            >
              <td>
                <span className="badge badge-pill badge-success">
                  chuyển khoản
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{thousandify(item.amount)}</td>
              <td>{item.created_at}</td>
              <td>{item.transaction_id}</td>
            </tr>
          );
        if (item.type === 2)
          return (
            <tr
              className="table-primary"
              key={item.transaction_id}
              data-toggle="modal"
              data-target="#historyDetailComponent"
              onClick={() => this.showTranser(item)}
            >
              <td>
                <span className="badge badge-pill badge-warning">
                  thanh toán nợ
                </span>
              </td>
              <td>{item.from_account_number}</td>
              <td>{item.to_account_number}</td>
              <td>{thousandify(item.amount)}</td>
              <td>{item.created_at}</td>
              <td>{item.transaction_id}</td>
            </tr>
          );
        if (item.type === 3) {
          if (item.from_account_number !== null)
            return (
              <tr
                className="table-primary"
                key={item.transaction_id}
                data-toggle="modal"
                data-target="#historyDetailComponent"
                onClick={() => this.showTranser(item)}
              >
                <td>
                  <span className="badge badge-pill badge-info">nhận tiền</span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{thousandify(item.amount)}</td>
                <td>{item.created_at}</td>
                <td>{item.transaction_id}</td>
              </tr>
            );
          else
            return (
              <tr
                className="table-primary"
                key={item.transaction_id}
                data-toggle="modal"
                data-target="#historyDetailComponent"
                onClick={() => this.showTranser(item)}
              >
                <td>
                  <span className="badge badge-pill badge-secondary">
                    nạp tiền
                  </span>
                </td>
                <td>{item.from_account_number}</td>
                <td>{item.to_account_number}</td>
                <td>{thousandify(item.amount)}</td>
                <td>{item.created_at}</td>
                <td>{item.transaction_id}</td>
              </tr>
            );
        }
        return null;
      });

    const table_from = (
      <div>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Loại</th>
              <th scope="col">Gửi</th>
              <th scope="col">Nhận</th>
              <th scope="col">
                Số tiền <small>(VNĐ)</small>
              </th>
              <th scope="col">Thời gian</th>
              <th scope="col">Mã GD</th>
            </tr>
          </thead>
          <tbody>{list_transaction_from_show}</tbody>
        </table>
        <div className="row justify-content-sm-center">
          <Pagination
            activePage={this.state.activePage_from}
            itemsCountPerPage={itemsCountPerPage_from}
            totalItemsCount={list_transaction_from.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange_from.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );

    const table = (
      <div>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Loại</th>
              <th scope="col">Gửi</th>
              <th scope="col">Nhận</th>
              <th scope="col">
                Số tiền <small>(VNĐ)</small>
              </th>
              <th scope="col">Thời gian</th>
              <th scope="col">Mã GD</th>
            </tr>
          </thead>
          <tbody>{list_transaction_to_show}</tbody>
        </table>
        <div className="row justify-content-sm-center">
          <Pagination
            activePage={this.state.activePage_to}
            itemsCountPerPage={itemsCountPerPage_to}
            totalItemsCount={list_transaction_to.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange_to.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
    return (
      <div>
        <h6>
          Tổng chuyển đi: {thousandify(statistic.total_to)} <small>(VNĐ)</small>
        </h6>
        <h6>
          Tổng chuyển tới: {thousandify(statistic.total_from)}{" "}
          <small>(VNĐ)</small>
        </h6>
        <hr />
        <h5>Danh sách giao dịch chuyển đi</h5>
        <div style={{ fontSize: "15px" }}>{table}</div>

        <h5>Danh sách giao dịch chuyển tới</h5>
        <div style={{ fontSize: "15px" }}>{table_from}</div>

        <HistoryDetail transfer={this.state.transfer} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statistic: state.statistic,
  };
};

export default connect(mapStateToProps, null)(Tranx);
