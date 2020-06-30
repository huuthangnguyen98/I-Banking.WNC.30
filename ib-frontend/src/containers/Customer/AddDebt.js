import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class AddDebt extends Component {
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
                            placeholder="Số tài khoản"
                            ref="id"
                        />
                    </div>
                    <div className="form-group col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Số tiền"
                            ref="name"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nội dung"
                            ref="name"
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

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(null, mapDispatchToProps)(AddDebt);
