import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class AddEmployee extends Component {
    _addDebt = (e) => {
        e.preventDefault();
        // const id = this.refs.id.value;
        // const name = this.refs.name.value;
        // if (id !== "" && name !== "") this.props.onAddReiver(id, name);
    };
    render() {
        return (
            <form onSubmit={(e) => this._addReceiver(e)}>
                <div className="form-row">
                    <div className="form-group col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại"
                            ref="id"
                        />
                    </div>
                    <div className="form-group col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Họ và tên"
                            ref="name"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Địa chỉ"
                            ref="name"
                        />
                    </div>
                    <div className="form-group col-sm-3">
                        <button type="submit" className="btn btn-primary">
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(null, mapDispatchToProps)(AddEmployee);
