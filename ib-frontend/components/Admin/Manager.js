import React, { Component } from "react";
import AddEmployee from "../../containers/Admin/AddEmployee";

class Manager extends Component {
    render() {
        return (
            <div>
                <h4>Danh sách nhân viên</h4>
                <AddEmployee />
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">09</th>
                            <td>noname</td>
                            <td>hcm</td>
                            <td>
                                <button className="btn btn-warning btn-sm mr-2">
                                    Sửa
                                </button>
                                <button className="btn btn-danger btn-sm">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Manager;
