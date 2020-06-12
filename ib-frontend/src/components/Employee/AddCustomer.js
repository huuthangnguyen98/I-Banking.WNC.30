import React, { Component } from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";

class AddCustomer extends Component {
    handleInput = (e) => {
        e.preventDefault();
        this.props.onAddCustomer();
    };
    render() {
        return (
            <form onSubmit={this.handleInput}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Tên đăng nhập</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Mật khẩu</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Họ và tên</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="form-row">
                    <div className="form-group col-sm-8">
                        <label htmlFor="inputCity">Email</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="inputZip">Số điện thoại</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                        Tạo tài khoản
                    </button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCustomer: () => {
            dispatch(actions.addCustomer());
        },
    };
};
export default connect(null, mapDispatchToProps)(AddCustomer);
