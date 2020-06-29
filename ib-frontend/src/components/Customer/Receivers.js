import React, { Component } from "react";
import { connect } from "react-redux";
import AddReceiver from "../../containers/Customer/AddReceiver";
import * as CustomerActions from "../../actions/CustomerActions";
class Receivers extends Component {
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
                <td>
                    <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => this._onChange(item.id)}
                    >
                        Sửa
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            if (
                                window.confirm("Xóa người nhận khỏi danh sách?")
                            )
                                this._onRemove(item.id);
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
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Số tài khoản</th>
                            <th scope="col">Tên gợi nhớ</th>
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
        list: state.listReceivers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveReceiver: (id) => {
            dispatch(CustomerActions.removeReceiver(id));
        },
        onChange: (id, name) => {
            dispatch(CustomerActions.changeReceiver(id, name));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receivers);
