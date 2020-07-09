import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const fetchListEmployeeReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("employee/list-employee", "GET", null, token).then((res) => {
      let list = res.data.data;
      dispatch(fetchListEmployee(list));
    });
  };
};

export const addEmployeeReq = (emp) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(
      "employee/create",
      "POST",
      {
        fullname: emp.full_name,
        password: emp.pw,
        email: emp.email,
        phone: emp.phone,
      },
      token
    ).then((res) => {
      if (res.data.code === 0) {
        alert("Thêm nhân viên thành công!");
        dispatch(addEmployee(res.data.data));
      } else {
        alert("Thêm nhân viên thất bại! Vui lòng thử lại.");
      }
    });
  };
};

export const addEmployee = (emp) => {
  return {
    type: types.ADD_EMPLOYEE,
    emp,
  };
};

export const removeEmployee = (id) => {
  return {
    type: types.REMOVE_EMPLOYEE,
    id,
  };
};

export const removeEmployeeReq = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(
      "employee/delete",
      "POST",
      {
        user_id: id,
      },
      token
    ).then((res) => {
      if (res.data.code === 0) {
        alert("Xóa nhân viên thành công!");
        dispatch(removeEmployee(id));
      } else {
        alert("Cập nhật thất bại! Vui lòng thử lại.");
      }
    });
  };
};

export const updateEmployee = (id, name) => {
  return {
    type: types.UPDATE_EMPLOYEE,
    id,
    name,
  };
};

export const updateEmployeeReq = (id, name) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(
      "employee/update",
      "POST",
      {
        user_id: id,
        fullname: name,
      },
      token
    ).then((res) => {
      if (res.data.code === 0) {
        dispatch(updateEmployee(id, name));
      } else {
        alert("Cập nhật thất bại! Vui lòng thử lại.");
      }
    });
  };
};
export const fetchListEmployee = (data) => {
  return {
    type: types.FETCH_LIST_EMPLOYEE,
    data,
  };
};
