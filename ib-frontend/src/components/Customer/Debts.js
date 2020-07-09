import React, { Component } from "react";
import { connect } from "react-redux";
import AddDebt from "../../containers/Customer/AddDebt";
import ShowUnpaid from "./ShowUnpaid";
//import AddReceiver from "../../containers/Customer/AddReceiver";
//import * as CustomerActions from "../../actions/CustomerActions";
class Debts extends Component {
  componentDidMount() {
    //var self = this;
    //self.props.onFetchReceivers();
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
  render() {
    const { list } = this.props;
    const List = list.map((item, index) => (
      <tr key={index}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>100.000</td>
        <td>
          <button className="btn btn-success btn-sm mr-2">Chi tiết</button>
          <button
            className="btn btn-warning btn-sm mr-2"
            onClick={() => this._onChange(item.id)}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm("Xóa người nhận khỏi danh sách?"))
                this._onRemove(item.id);
            }}
          >
            Hủy
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <h4>Tạo nhắc nợ</h4>
        <AddDebt />
        <hr />
        <div>
          <ShowUnpaid />
        </div>
        <hr />
        <h4>Danh sách nhắc nợ do bản thân tạo</h4>
        <table className="table table-sm" style={{ fontSize: "15px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Số tài khoản</th>
              <th scope="col">Tên gợi nhớ</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{List}</tbody>
        </table>
        <hr />
        <h4>Danh sách nhắc nợ được gửi tới</h4>
        <table className="table table-sm" style={{ fontSize: "15px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Số tài khoản</th>
              <th scope="col">Tên gợi nhớ</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Thao tác</th>
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
    list: state.listDebts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Debts);
