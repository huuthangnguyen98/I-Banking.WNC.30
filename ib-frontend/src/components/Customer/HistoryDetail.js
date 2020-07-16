import React, { Component } from "react";
import { connect } from "react-redux";
import thousandify from "thousandify";
class HistoryDetail extends Component {
  render() {
    const { transfer } = this.props;
    let badgeType;
    switch (transfer.type) {
      case 1:
        badgeType = (
          <span className="badge badge-pill badge-success">chuyển khoản</span>
        );
        break;
      case 2:
        badgeType = (
          <span className="badge badge-pill badge-warning">thanh toán nợ</span>
        );
        break;
      case 3:
        if (transfer.from_account_number !== null)
          badgeType = (
            <span className="badge badge-pill badge-info">nhận tiền</span>
          );
        else
          badgeType = (
            <span className="badge badge-pill badge-secondary">nạp tiền</span>
          );
        break;
      default:
    }
    return (
      <div
        className="modal fade"
        id="historyDetailComponent"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Chi tiết giao dịch</h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container">
              <div className="row">
                <div className="col col-sm-4">Mã giao dịch</div>
                <div className="col col-sm-8">: {transfer.transaction_id} </div>
                <div className="col col-sm-4">Loại</div>
                <div className="col col-sm-8">: {badgeType}</div>
                <div className="col col-sm-4">Tài khoản gửi</div>
                <div className="col col-sm-8">
                  : {transfer.from_account_number}{" "}
                </div>
                <div className="col col-sm-4">Tài khoản nhận</div>
                <div className="col col-sm-8">
                  : {transfer.to_account_number}{" "}
                </div>
                <div className="col col-sm-4">Số tiền</div>
                <div className="col col-sm-8">
                  : {thousandify(transfer.amount)} VNĐ
                </div>
                <div className="col col-sm-4">Nội dung</div>
                <div className="col col-sm-8">: {transfer.description}</div>
                <div className="col col-sm-4">Thời gian</div>
                <div className="col col-sm-8">: {transfer.created_at} </div>
                <div className="col col-sm-4">Gửi từ Ngân hàng</div>
                <div className="col col-sm-8">: {transfer.fromBank}</div>
                <div className="col col-sm-4">Đến Ngân hàng</div>
                <div className="col col-sm-8">: {transfer.toBank}</div>
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
    debtDetail: state.debtDetail,
  };
};

export default connect(mapStateToProps, null)(HistoryDetail);
