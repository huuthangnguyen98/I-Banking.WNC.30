import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
class PayIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confimed: false,
        };
    }
    _confirm = () => {
        const token = localStorage.getItem("token");
        const id = this.refs.id.value;
        callApi("account/info", "POST", { account_number: id }, token).then(
            (res) => {
                if (res.data.code !== 0) {
                    alert("Số tài khoản không hợp lệ/ không tồn tại.");
                } else {
                    alert("Số tài khoản hợp lệ.");
                    this.setState({
                        confimed: true,
                    });
                }
            }
        );
    };
    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên đăng nhập hoặc số tài khoản"
                            ref="id"
                        />
                    </div>
                    <div className="form-group col">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this._confirm()}
                        >
                            Xác minh
                        </button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Số tiền nạp"
                        />
                    </div>
                    {this.state.confimed ? (
                        <div className="form-group col">
                            <button type="button" className="btn btn-primary">
                                Xác nhận
                            </button>
                        </div>
                    ) : null}
                </div>
            </form>
        );
    }
}

export default PayIn;
