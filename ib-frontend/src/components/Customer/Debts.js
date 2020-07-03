import React, { Component } from "react";
import { connect } from "react-redux";
import AddDebt from "../../containers/Customer/AddDebt";
import ShowUnpaid from "./ShowUnpaid";
//import AddReceiver from "../../containers/Customer/AddReceiver";
import * as CustomerActions from "../../actions/CustomerActions";
import { thousandsSeparators } from '../../utils/general'
import callApi from "../../utils/apiCaller";
class Debts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingTransaction: false,
        }
        this._loadingButtonInfo = {
            isDebtOwnerList: null,
            indexOfButton: null
        }
    }
    componentDidMount() {
        var self = this;
        self.props.onFetchReceivers();
        window.addEventListener("beforeunload", this._preventPrompt, false)
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this._preventPrompt, false);
    }
    _preventPrompt = (e) => {
        e.preventDefault();
    }
    _onClickCancelDebt = ({ debtId, isDebtOwner }) => {
        const self = this;

        let description = prompt('Vui lòng nhập lý do hủy nhắc nợ này:');

        while (!description && description !== null) {
            description = prompt('Vui lòng nhập lý do hủy nhắc nợ này:');
        }

        if (description) {
            self.props.onCancelDebt({ debtId, description, isDebtOwner });
        }

    };
    _onChange = (id) => {
        const self = this;

        var name = prompt("Tên gợi nhớ mới :");
        if (name != null) {
            self.props.onChange(id, name);
        }
    };
    _onClickPayDebt = ({ debtId, isDebtOwnerList, indexOfButton }) => {
        this._loadingButtonInfo = {
            isDebtOwnerList,
            indexOfButton
        }
        this.setState({ isCreatingTransaction: true });
        this._callTransactionWaitForOTP(debtId)
    }
    _callTransactionWaitForOTP = (debtId) => {
        callApi("user/pay-debt", "POST", { debt_id: debtId }).then((res) => {
            if (res && res.data && res.data.data) {
                let { to_account_number, amount, transaction_id } = res.data.data;

                let otp = prompt(`Bạn đang thực hiện một giao dịch chuyển tiền đến số tài khoản ${to_account_number}.\nTài khoản của bạn sẽ bị trừ: ${thousandsSeparators(amount)}đ.\nHãy nhập OTP đã được gửi qua email của bạn để xác nhận giao dịch:`);
                if (otp) {
                    this._loadingButtonInfo = {
                        isDebtOwnerList: null,
                        indexOfButton: null
                    }
                    this.setState({ isCreatingTransaction: false });
                    this._onPayDebt({ debtId, transaction_id, otp })
                }
            }
        })
    }
    _onPayDebt = ({ debtId, transaction_id, otp }) => {
        const self = this;
        self.props.onPayDebt({ debtId, transaction_id, otp });
    };

    _renderDebtList = (list, isDebtOwner) => {
        const { isCreatingTransaction } = this.state;
        const { isDebtOwnerList, indexOfButton } = this._loadingButtonInfo

        if (list && list.length) {

            return list.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{item.debtor_account_number}</th>
                    <td>{item.name}</td>
                    <td>{thousandsSeparators(item.amount)}</td>
                    <td>
                        {/* NOTE: status = là chưa thanh toán */}
                        {item.status === 0 && 'Đã thanh toán'}
                        {item.status === 1 && !isDebtOwner &&
                            (<button className="btn btn-success btn-sm mr-2"
                                disabled={isCreatingTransaction && isDebtOwnerList === isDebtOwner && indexOfButton === index}
                                onClick={() => this._onClickPayDebt({ debtId: item.debtor_id, isDebtOwnerList: isDebtOwner, indexOfButton: index })}>
                                {isCreatingTransaction && isDebtOwnerList === isDebtOwner && indexOfButton === index ? 'Loading...' : 'Thanh toán'}
                            </button>)
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
                                    window.confirm("Chắc chắn xóa nhắc nợ này?")
                                )
                                    this._onClickCancelDebt({ debtId: item.debtor_id, isDebtOwner });
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
        onFetchReceivers: () => dispatch(CustomerActions.fetchReceiversReq()),
        onPayDebt: ({ debtId, transaction_id, otp }) => dispatch(CustomerActions.payDebtReq({ debtId, transaction_id, otp })),
        onCancelDebt: ({ debtId, description, isDebtOwner }) => dispatch(CustomerActions.cancelDebtReq({ debtId, description, isDebtOwner }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debts);

