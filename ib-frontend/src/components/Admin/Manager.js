import React, { Component } from "react";
import { connect } from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1,
    };
  }
  _change = (item) => {
    const self = this;

    var name = prompt("Cập nhật Họ và tên :", item.full_name);
    if (name !== null) {
      self.props.onUpdateEmployee(item.user_id, name);
    }
  };
  componentDidMount() {
    const self = this;
    self.props.onFetchListEmployee();
  }
  render() {
    const { listEmp } = this.props;

    const list = listEmp.map((item) => (
      <tr key={item.user_id}>
        <td>{item.phone}</td>
        <td>{item.full_name}</td>
        <td>{item.email}</td>
        <td>
          <button
            className="btn btn-warning  mr-2"
            style={{ fontSize: "12px" }}
            onClick={() => this._change(item)}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger "
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (window.confirm("Xác nhận xóa nhân viên?"))
                this.props.onRemoveEmployee(item.user_id);
            }}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4>Danh sách nhân viên</h4>
        <table
          className="table table-sm table-hover"
          style={{ fontSize: "15px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Email</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listEmp: state.listEmployee,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchListEmployee: () => {
      dispatch(AdminActions.fetchListEmployeeReq());
    },
    onUpdateEmployee: (id, name) => {
      dispatch(AdminActions.updateEmployeeReq(id, name));
    },
    onRemoveEmployee: (id) => {
      dispatch(AdminActions.removeEmployeeReq(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Manager);
