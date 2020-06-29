import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class Home extends Component {
    componentDidMount() {
        //var self = this;
        //self.props.onFetchInfo();
    }
    render() {
        const { profile, list } = this.props;
        const accountList = list.map((item) => (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.amount}</td>
                <td>{item.class === 0 ? "Thanh toán" : "Tiết kiệm"}</td>
            </tr>
        ));

        return (
            <div className="container">
                <h4>Thông tin cá nhân</h4>
                <div>Họ tên : {profile.name}</div>
                <div>
                    <span>Email : {profile.email} </span>
                </div>
                <div>
                    <span>Số điện thoại : {profile.phone}</span>
                </div>
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
        onFetchInfo: () => {
            dispatch(CustomerActions.fetchInfo());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
