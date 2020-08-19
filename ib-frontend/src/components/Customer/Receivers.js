import React, { Component } from "react";
import { connect } from "react-redux";
import AddReceiver from "../../containers/Customer/AddReceiver";
import * as CustomerActions from "../../actions/CustomerActions";
import * as Actions from "../../actions/index";
class Receivers extends Component {
  componentWillUnmount() {
    document.title = "30-BANK";
  }

  componentDidMount() {
    document.title = "Danh sách người nhận";
    const { list } = this.props;
    if (list.length === 0) this.props.on_showSpinner();
    var self = this;
    self.props.onFetchReceivers();
  }
  _onRemove = (id) => {
    const self = this;
    self.props.onRemoveReceiver(id);
  };
  _onChange = (id) => {
    const self = this;

    var name = prompt("Tên gợi nhớ mới :");
    if (name !== null) {
      self.props.onChange(id, name);
    }
  };
  render() {
    const { list } = this.props;
    const List = list.map((item, index) => (
      <tr key={item.receiver_account_number.toString() + index.toString()}>
        <th scope="row">{item.receiver_account_number}</th>
        <td>{item.receiver_name}</td>
        <td>{item.receiver_bank}</td>
        <td>
          <button
            className="btn btn-warning btn-xs mr-2"
            style={{ fontSize: "12px" }}
            onClick={() => this._onChange(item.receiver_account_number)}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger btn-xs"
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (window.confirm("Xóa người nhận khỏi danh sách?"))
                this._onRemove(item.receiver_account_number);
            }}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <h4>Danh sách người nhận</h4>
        <AddReceiver />
        <table className="table table-sm" style={{ fontSize: "15px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="w-50">
                Số tài khoản
              </th>
              <th scope="col" className="w-30">
                Tên gợi nhớ
              </th>
              <th scope="col" className="w-20">
                Ngân hàng
              </th>
              <th scope="col" className="w-20">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>{List}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.listReceivers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveReceiver: (id) => {
      dispatch(CustomerActions.removeReceiverReq(id));
    },
    onChange: (id, name) => {
      dispatch(CustomerActions.changeReceiverReq(id, name));
    },
    onFetchReceivers: () => {
      dispatch(CustomerActions.fetchReceiversReq());
    },
    on_showSpinner: () => {
      dispatch(Actions.show_spinner());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receivers);
