import React, { Component } from "react";
import { connect } from "react-redux";
import thousandify from "thousandify";
class DebtDetail extends Component {
  render() {
    const { debtDetail } = this.props;
    let badgeStatus;
    switch (debtDetail.status) {
      case 0:
        badgeStatus = (
          <span className="badge badge-pill badge-success">đã trả</span>
        );
        break;
      case 1:
        badgeStatus = (
          <span className="badge badge-pill badge-danger">chưa trả</span>
        );
        break;
      case 2:
        badgeStatus = (
          <span className="badge badge-pill badge-secondary">đã hủy</span>
        );
        break;
      default:
    }
    return (
      <div
        className="modal fade"
        id="debtDetailComponent"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Chi tiết</h6>
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
                <div className="col col-sm-4">Mã</div>
                <div className="col col-sm-8">: {debtDetail.debtor_id}</div>
                <div className="col col-sm-4">Tình trạng</div>
                <div className="col col-sm-8">: {badgeStatus}</div>
                <div className="col col-sm-4">Tài khoản nợ</div>
                <div className="col col-sm-8">
                  : {debtDetail.debtor_account_number}
                </div>
                <div className="col col-sm-4">Tài khoản chủ nợ</div>
                <div className="col col-sm-8">
                  : {debtDetail.reveiver_account_number}
                  {/* -{" "}{debtDetail.receiver_name} */}
                </div>
                <div className="col col-sm-4">Số tiền</div>
                <div className="col col-sm-8">
                  : {thousandify(debtDetail.amount)} VNĐ
                </div>
                <div className="col col-sm-4">Nội dung</div>
                <div className="col col-sm-8">: {debtDetail.description}</div>
                <div className="col col-sm-4">Thời gian tạo</div>
                <div className="col col-sm-8">: {debtDetail.created_at}</div>
                <div className="col col-sm-4">Cập nhật</div>
                <div className="col col-sm-8">: {debtDetail.updated_at}</div>
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

export default connect(mapStateToProps, null)(DebtDetail);
