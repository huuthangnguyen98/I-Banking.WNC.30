import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { fetchInfo, fetchListAccount } from "./CustomerActions";
export const wrongLogging = () => {
  return {
    type: types.WRONG_LOGGING,
  };
};
export const loginWithToken = (token) => {
  return (dispatch) => {
    return callApi("user/info", "GET", null, token).then((res) => {
      if (res.data.code === 0) {
        let role = res.data.data.role;
        localStorage.setItem("username", res.data.data.full_name);
        if (role === 1) dispatch(loginCustomer());
        if (role === 2) dispatch(loginEmployee());
        if (role === 3) dispatch(loginAdmin());

        const data = {
          name: res.data.data.full_name,
          email: res.data.data.email,
          phone: res.data.data.phone,
        };
        dispatch(fetchInfo(data));

        return callApi("user/list-account", "GET", null, token).then((res) => {
          let list = res.data.data;
          dispatch(fetchListAccount(list));
        });
      } else console.log(res.data.message + " : " + res.data.code);
    });
  };
};

export const login = (username, pwd) => {
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi("authenticate", "POST", {
      username,
      password: pwd,
    }).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        let token = res.data.data.access_token;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", res.data.data.refresh_token);
        localStorage.setItem("phone", username);
        return dispatch(loginWithToken(token));
      } else dispatch(wrongLogging());
    });
  };
};

export const changePw = (oldpw, newpw, data = null) => {
  var token;
  if (data === null) token = localStorage.getItem("token");
  else token = data;
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    // nothing here

    return callApi(
      "user/change-password",
      "POST",
      { old_password: oldpw, new_password: newpw },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        alert("Thay đổi mật khẩu thành công");
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Thay đổi mật khẩu không thành công. Vui lòng thử lại");
      }
    });
  };
};

export const loginCustomer = () => {
  return {
    type: types.LOGIN_CUSTOMER,
  };
};

export const loginEmployee = () => {
  return {
    type: types.LOGIN_EMPLOYEE,
  };
};

export const loginAdmin = () => {
  return {
    type: types.LOGIN_ADMIN,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: types.LOGOUT,
  };
};

export const show_spinner = () => {
  return {
    type: types.SHOW_SPINNER,
  };
};

export const hide_spinner = () => {
  return {
    type: types.HIDE_SPINNER,
  };
};

export const fetch_list_partner = (data) => {
  return {
    type: types.FETCH_LIST_PARTNER,
    data,
  };
};

export const fetch_list_partnerReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("account/list-partners", "GET", null, token).then((res) => {
      if (res.data.code === 0) {
        dispatch(fetch_list_partner(res.data.data));
      } else console.log(res.data.message + " : " + res.data.code);
    });
  };
};
