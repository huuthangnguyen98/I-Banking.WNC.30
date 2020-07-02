import React, { Component } from "react";
import { connect } from "react-redux";
import AddDebt from "../../containers/Customer/AddDebt";
import ShowUnpaid from "./ShowUnpaid";
//import AddReceiver from "../../containers/Customer/AddReceiver";
import * as CustomerActions from "../../actions/CustomerActions";
import { thousandsSeparators } from '../../utils/number'
class Debts extends Component {
    componentDidMount() {
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
        if (name != null) {
            self.props.onChange(id, name);
        }
    };
    _renderDebtList = (list, isDebtOwner) => {

        if (list && list.length) {

            return list.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{item.debtor_account_number}</th>
                    <td>{item.name}</td>
                    <td>{thousandsSeparators(item.amount)}</td>
                    <td>
                        {/* NOTE: status = là chưa thanh toán */}
                        {item.status === 0 && 'Đã thanh toán'}
                        {item.status === 1 && !isDebtOwner && <button className="btn btn-success btn-sm mr-2">
                            Thanh toán
                    </button>
                        }

                        {/* <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => this._onChange(item.id)}
                    >
                        Sửa
                    </button> */}
                        {item.status === 1 && <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                if (
                                    window.confirm("Xóa người nhận khỏi danh sách?")
                                )
                                    this._onRemove(item.id);
                            }}
                        >
                            Hủy
                    </button>}

                        {item.status === 2 && 'Đã hủy'}
                    </td>
                </tr>
            ));
        } else {
            return <tr><td>Chưa có thông tin</td></tr>;
        }
    }
    render() {
        const { debts, debtors } = this.props;

        return (
            <div className="container">
                <h4>Tạo nhắc nợ</h4>
                <AddDebt />
                <hr />
                {/* <div>
                    <ShowUnpaid />
                </div> */}
                <hr />
                <h4>Danh sách nhắc nợ do bản thân tạo</h4>
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Số tài khoản</th>
                            <th scope="col">Tên gợi nhớ</th>
                            <th scope="col">Số tiền</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>{this._renderDebtList(debtors, true)}</tbody>
                </table>
                <hr />
                <h4>Danh sách nhắc nợ được gửi tới</h4>
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Số tài khoản</th>
                            <th scope="col">Tên gợi nhớ</th>
                            <th scope="col">Số tiền</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>{this._renderDebtList(debts)}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        debts: state.listDebts.debts,
        debtors: state.listDebts.debtors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchReceivers: () => dispatch(CustomerActions.fetchReceiversReq())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debts);
