import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class AddReceiver extends Component {
    _addReceiver = (e) => {
        e.preventDefault();
        const id = this.refs.id.value;
        const name = this.refs.name.value;
        if (id !== "" && name !== "") this.props.onAddReiver(id, name);
    };
    render() {
        return (
            <form onSubmit={(e) => this._addReceiver(e)}>
                <div className="form-row">
                    <div className="form-group col-sm-6">
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
                            placeholder="Tên gợi nhớ"
                            ref="name"
                        />
                    </div>
                    <div className="form-group col-sm-2">
                        <button type="submit" className="btn btn-primary">
                            Thêm
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddReiver: (id, name) => {
            dispatch(CustomerActions.addReceiver(id, name));
        },
    };
};
export default connect(null, mapDispatchToProps)(AddReceiver);
