import React, { Component } from "react";
import { connect } from "react-redux";
import * as CustomerActions from "../../actions/CustomerActions";
class ShowUnpaid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    toogleShow = () => {
        this.setState({
            show: !this.state.show,
        });
    };
    render() {
        if (this.state.show)
            var dash = (
                <div>
                    <h4>Danh sách nợ chưa thanh toán</h4>
                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Số tài khoản</th>
                                <th scope="col">Tên gợi nhớ</th>
                                <th scope="col">Số tiền</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">09</th>
                                <td>noname</td>
                                <td>100.000</td>
                                <td>
                                    <button className="btn btn-success btn-sm mr-2">
                                        Chi tiết
                                    </button>
                                    <button className="btn btn-warning btn-sm mr-2">
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-warning btn-sm mr-2 mb-3"
                        onClick={() => this.toogleShow()}
                    >
                        Xem danh sách nợ chưa thanh toán
                    </button>
                </div>

                {dash}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(null, mapDispatchToProps)(ShowUnpaid);
