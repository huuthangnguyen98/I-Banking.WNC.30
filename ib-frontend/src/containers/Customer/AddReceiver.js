import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class AddReceiver extends Component {
  _addReceiver = (e) => {
    e.preventDefault();
    const id = this.refs.id.value;
    const name = this.refs.name.value;
    const bank = this.refs.bank.value;
    const { list, listAccount } = this.props;
    if (
      list.filter((item) => item.receiver_account_number.toString() === id)
        .length > 0
    ) {
      alert("Số tài khoản đã tồn tại trong danh sách!");
    } else {
      var isSame = false;
      listAccount.forEach((item) => {
        if (item.account_number == id) {
          isSame = true;
          alert("Không thể thêm số tài khoản của chính mình làm người nhận!");
        }
      });
      if (id !== "" && isSame === false) this.props.onAddReiver(id, name, bank);
    }
  };
  render() {
    const { Partners } = this.props;
    const listPartners_show = Partners.map((item) => (
      <option key={item.partnerId}>{item.partnerName}</option>
    ));
    return (
      <form onSubmit={(e) => this._addReceiver(e)}>
        <div className="form-row">
          <div className="form-group col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Số tài khoản"
              ref="id"
            />
          </div>
          <div className="form-group col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Tên gợi nhớ"
              ref="name"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-10">
            <select className="form-control" ref="bank">
              <option>30Bank</option>
              {listPartners_show}
            </select>
          </div>
          <div className="form-group col-sm-2">
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.listReceivers,
    Partners: state.Partners,
    listAccount: state.listAccount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddReiver: (id, name, bank) => {
      dispatch(CustomerActions.addReceiverReq(id, name, bank));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddReceiver);
// end here
