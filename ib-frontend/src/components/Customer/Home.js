import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
import thousandify from "thousandify";
class Home extends Component {
  componentDidMount() {
    document.title = "Thông tin";
  }
  componentWillUnmount() {
    document.title = "30-BANK";
  }
  render() {
    const { profile, list } = this.props;
    const accountList = list
      ? list.map((item) => (
          <tr key={item.account_number}>
            <th scope="row">{item.account_number}</th>
            <td>{thousandify(item.balance)} VNĐ</td>
            <td>{item.account_type === 1 ? "Thanh toán" : "Tiết kiệm"}</td>
          </tr>
        ))
      : null;

    return (
      <div className="container">
        <h4>Thông tin cá nhân</h4>
        <table className="table table-borderless table-sm">
          <tbody>
            <tr>
              <td>Họ tên :</td>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <td>Email :</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>Số điện thoại :</td>
              <td>{profile.phone}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h4>Danh sách tài khoản</h4>
        <table className="table" style={{ fontSize: "15px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Số tài khoản</th>
              <th scope="col">Số dư</th>
              <th scope="col">Loại</th>
            </tr>
          </thead>
          <tbody>{accountList}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.customerProfile,
    list: state.listAccount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchListAccount: () => {
      dispatch(CustomerActions.fetchListAccountReq());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
