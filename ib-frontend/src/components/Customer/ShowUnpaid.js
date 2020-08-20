import React, { Component } from "react";
import thousandify from "thousandify";
class ShowUnpaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      des: "",
      created_at: "",
      id: "",
      amount: 0,
    };
  }
  toogleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  //start here
  render() {
    const {
      listDebtsToUser,
      _onCancelDebtToUser,
      _onPayback,
      show_detailDebt,
      setInfoPayBack,
    } = this.props;

    const listDebtsToUser_showUnpaid = listDebtsToUser
      .filter((item) => item.status === 1)
      .map((item) => (
        //--- copy from toUserList
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
              onClick={() => show_detailDebt(item.debtor_id)}
              style={{ fontSize: "12px" }}
            >
              Chi tiết
            </button>
            <button
              className="btn btn-danger btn-sm mr-2"
              onClick={() => _onCancelDebtToUser(item.debtor_id)}
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
                setInfoPayBack(item.reveiver_account_number, item.amount);
                _onPayback(item.debtor_id);
              }}
              style={{ fontSize: "12px" }}
            >
              Thanh toán
            </button>
          </td>
        </tr>
        //------------------------
      ));
    if (this.state.show)
      var dash = (
        <div>
          <h5>
            Danh sách nợ chưa thanh toán <small>(được gửi tới)</small>{" "}
            <i
              className="fa fa-bell"
              style={{ color: "red" }}
              aria-hidden="true"
            ></i>
          </h5>
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
            <tbody>{listDebtsToUser_showUnpaid}</tbody>
          </table>
        </div>
      );
    return (
      <div>
        <div className="d-flex justify-content-center">
          <button
            className={
              this.state.show
                ? "btn btn-secondary btn-sm mr-2 mb-3"
                : "btn btn-warning btn-sm mr-2 mb-3"
            }
            onClick={() => this.toogleShow()}
          >
            {this.state.show ? "Ẩn" : "Xem"} danh sách nợ chưa thanh toán
          </button>
        </div>

        {dash}
      </div>
    );
  }
}

export default ShowUnpaid;
