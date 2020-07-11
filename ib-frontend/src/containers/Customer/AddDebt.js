import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class AddDebt extends Component {
  componentDidMount() {
    const self = this;
    self.props.onFetchReceivers();
  }
  constructor(props) {
    super(props);
    this.state = {
      inputType: true,
    };
  }
  _addDebt = (e) => {
    e.preventDefault();
    let err = false;
    let id;
    if (this.state.inputType) id = this.refs.id.value;
    else {
      const { listReceivers } = this.props;
      id = listReceivers[this.refs.id.selectedIndex].receiver_account_number;
    }
    const amount = this.refs.amount.value;
    const des = this.refs.des.value;
    if (amount === "") {
      alert("Vui lòng nhập Số tiền!");
      err = true;
    }
    if (id === "") {
      alert("Vui lòng nhập Số tài khoản!");
      err = true;
    }
    if (!err) {
      this.props.onAddDebt(id, amount, des);
    }
  };
  _changeTypeInput = () => {
    this.setState({
      inputType: !this.state.inputType,
    });
  };
  render() {
    const { listReceivers } = this.props;

    const listRe_show = listReceivers.map((item) => (
      <option key={item.receiver_account_number}>
        {item.receiver_account_number} - {item.receiver_name} -{" "}
        {item.receiver_bank}
      </option>
    ));
    let input;
    if (this.state.inputType) {
      input = (
        <input
          type="text"
          className="form-control"
          placeholder="Số tài khoản"
          ref="id"
        />
      );
    } else {
      input = (
        <select className="form-control" ref="id">
          {listRe_show}
        </select>
      );
    }
    return (
      <form onSubmit={(e) => this._addDebt(e)}>
        <div className="form-row">
          <div className="form-group col-sm-3">
            <select
              className="form-control"
              onChange={() => this._changeTypeInput()}
            >
              <option>Nhập số TK</option>
              <option>Chọn</option>
            </select>
          </div>
          <div className="form-group col-sm-6">{input}</div>
          <div className="form-group col-sm-3">
            <input
              type="number"
              className="form-control"
              placeholder="Số tiền (VNĐ)"
              ref="amount"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Nội dung"
              ref="des"
            />
          </div>
          <div className="form-group col-sm-2">
            <button type="submit" className="btn btn-primary">
              Gửi nhắc nợ
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listReceivers: state.listReceivers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReceivers: () => {
      dispatch(CustomerActions.fetchReceiversReq());
    },
    onAddDebt: (id, amount, des) => {
      dispatch(CustomerActions.addDebtReq(id, amount, des));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDebt);
