import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { show_spinner, hide_spinner } from "../actions/index";

export const fetchListEmployeeReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("employee/list-employee", "GET", null, token).then((res) => {
      //hide -----
      dispatch(hide_spinner());
      // //
      let list = res.data.data;
      dispatch(fetchListEmployee(list));
    });
  };
};

export const addEmployeeReq = (emp) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show ----
    dispatch(show_spinner());
    // //

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
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        alert("Thêm nhân viên thành công!");
        dispatch(addEmployee(res.data.data));
      } else {
        console.log(res.data.message + " : " + res.data.code);
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
// done here

export const removeEmployee = (id) => {
  return {
    type: types.REMOVE_EMPLOYEE,
    id,
  };
};

export const removeEmployeeReq = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "employee/delete",
      "POST",
      {
        user_id: id,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        alert("Xóa nhân viên thành công!");
        dispatch(removeEmployee(id));
      } else {
        console.log(res.data.message + " : " + res.data.code);
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
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "employee/update",
      "POST",
      {
        user_id: id,
        fullname: name,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        dispatch(updateEmployee(id, name));
      } else {
        console.log(res.data.message + " : " + res.data.code);
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

// export const fetchHistoryToLinkedBank = (data) => {
//   return {
//     type: types.FETCH_HISTORY_TO_LINKED_BANK,
//     data,
//   };
// };

// export const fetchHistoryFromLinkedBank = (data) => {
//   return {
//     type: types.FETCH_HISTORY_FROM_LINKED_BANK,
//     data,
//   };
// };

export const fetchStatistic = (data) => {
  return {
    type: types.FETCH_STATISTIC,
    data,
  };
};

export const fetchHistoryLinkedBankReq = (date_from, date_to, bank_name) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //
    return callApi(
      "admin/statistic",
      "POST",
      {
        date_from,
        date_to,
        bank_name,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        //console.log(res.data.data);
        // console.log(res.data.data.list_transaction_to);
        // dispatch(fetchHistoryToLinkedBank(res.data.data.list_transaction_to));
        // dispatch(fetchHistoryFromLinkedBank(res.data.data.list_transaction_to));
        dispatch(fetchStatistic(res.data.data));
      } else {
        console.log(res.data.message + " : " + res.data.code);
      }
    });
  };
};
