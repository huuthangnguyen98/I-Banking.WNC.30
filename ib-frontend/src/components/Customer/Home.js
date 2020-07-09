import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class Home extends Component {
  componentDidMount() {
    //var self = this;
    //self.props.onFetchListAccount();
    // console.log("again");
  }
  render() {
    const { profile, list } = this.props;
    const accountList = list
      ? list.map((item) => (
          <tr key={item.account_number}>
            <th scope="row">{item.account_number}</th>
            <td>{item.balance}</td>
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
        {/* <div>Họ tên : {profile.name}</div>
                <div>
                    <span>Email : {profile.email} </span>
                </div>
                <div>
                    <span>Số điện thoại : {profile.phone}</span>
                </div> */}
        <br />
        <h4>Danh sách tài khoản</h4>
        <table className="table">
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
