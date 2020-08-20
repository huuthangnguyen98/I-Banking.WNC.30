import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { changePw } from "./index";
import store from "../index";
// import * as config from "../constants/config";
import { show_spinner, hide_spinner } from "./index";

export const fetchInfo = (data) => {
  return {
    type: types.FETCH_INFO,
    data,
  };
};

export const fetchListAccount = (data) => {
  return {
    type: types.FETCH_LIST_ACCOUNT,
    data,
  };
};

export const fetchListAccountReq = () => {
  const token = localStorage.getItem("token");

  return (dispatch) => {
    return callApi("user/list-account", "GET", null, token).then((res) => {
      let list = res.data.data;
      dispatch(fetchListAccount(list));
    });
  };
};

export const fetchReceivers = (listReceivers) => {
  return {
    type: types.FETCH_RECEIVERS,
    listReceivers,
  };
};

export const fetchReceiversReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("user/list-receiver", "GET", null, token).then((res) => {
      // hide spinner ----
      dispatch(hide_spinner());
      if (res.data.code === 0) {
        const listReceivers = res.data.data;
        dispatch(fetchReceivers(listReceivers));
      } else console.log(res.data.message + " : " + res.data.code);
    });
  };
};

export const addReceiver = (id, name, bank) => {
  return {
    type: types.ADD_RECEIVER,
    name,
    id,
    bank,
  };
};

export const addReceiverReq = (id, name, bank) => {
  //console.log(bank);
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(show_spinner());
    return callApi(
      "account/info",
      "POST",
      { account_number: id, account_bank: bank },
      token
    ).then((res) => {
      //hide sping ----
      dispatch(hide_spinner());
      // //
      //  console.log(res);
      if (res.data.code === 0) {
        if (name === "") name = res.data.data.account_name;

        return callApi(
          "user/save-receiver",
          "POST",
          {
            account_bank: bank,
            account_number: id,
            account_name: name,
          },
          token
        ).then((res) => {
          // console.log(res);
          if (res.data.code === 0) {
            dispatch(addReceiver(id, name, bank));
          } else {
            console.log(res.data.message + " : " + res.data.code);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
          }
        });
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Số tài khoản không hợp lệ. Vui lòng thử lại");
      }
    });
  };
};

export const toogleUI_otpFrom = (status) => {
  return {
    type: types.TOOGLE_OTP_FORM,
    status,
  };
};

const defaultPw = "123456aA@";
export const sendOtp = (email, otp, newpw) => {
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi("user/reset-password", "POST", {
      email: email,
      otp: otp,
    }).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        const token = res.data.data;
        dispatch(changePw(defaultPw, newpw, token));
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Mã OTP không chính xác. Vui lòng thử lại");
      }
    });
  };
};

export const sendOtpTransfer = (trans) => {
  localStorage.setItem("to_account_number", trans.to_account_number);
  localStorage.setItem("to_bank", trans.to_bank);

  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("account/transfer", "POST", trans, token).then((res) => {
      dispatch(hide_spinner());
      if (res.data.code === 0) {
        dispatch(toogleUI_otpFrom(true));
        localStorage.setItem("transId", res.data.data.transaction_id);
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Giao dịch không thành công. Vui lòng thử lại!");
      }
    });
  };
};

export const sendOtpPayDebt = (id) => {
  const token = localStorage.getItem("token");

  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi("user/pay-debt", "POST", { debt_id: id }, token).then(
      (res) => {
        //hide spinner
        dispatch(hide_spinner());
        // //
        if (res.data.code === 0) {
          dispatch(toogleUI_otpFrom(true));
          localStorage.setItem("transId", res.data.data.transaction_id);
        } else {
          console.log(res.data.message + " : " + res.data.code);
          alert("Giao dịch không thành công. Vui lòng thử lại!");
        }
      }
    );
  };
};

export const confirmTransfer = (otp) => {
  const token = localStorage.getItem("token");
  const transaction_id = localStorage.getItem("transId");

  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "account/capture-transfer",
      "POST",
      { transaction_id, otp },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        dispatch(fetchListAccountReq());

        const id = localStorage.getItem("to_account_number");
        const bank = localStorage.getItem("to_bank");

        const list = store.getState().listReceivers;
        let isHas = false;
        list.forEach((item) => {
          if (id.toString() === item.receiver_account_number.toString()) {
            isHas = true;
          }
        });

        if (isHas) {
          alert("Chuyển khoản thành công!");
        } else {
          var name = prompt(
            "Chuyển khoản thành công. Bạn có muốn lưu lại người nhận này. Tên gợi nhớ :"
          );
          if (name !== null) {
            dispatch(addReceiverReq(id, name, bank));
          }
        }
      } else if (res.data.code === 1) {
        console.log(res.data.message + " : " + res.data.code);
        alert("Mã OTP không chính xác!");
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Chuyển khoản thất bại. Vui lòng thử lại");
      }
      dispatch(toogleUI_otpFrom(false));
    });
  };
};

export const removeReceiver = (id) => {
  return {
    type: types.REMOVE_RECEIVER,
    id,
  };
};

export const removeReceiverReq = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //
    return callApi(
      "user/remove-receiver",
      "POST",
      {
        account_number: id,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) dispatch(removeReceiver(id));
      else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Có lỗi xảy ra. Vui lòng thử lại");
      }
    });
  };
};

export const changeReceiverReq = (id, name) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //
    return callApi(
      "user/update-receiver",
      "POST",
      {
        account_number: id,
        account_name: name,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) dispatch(changeReceiver(id, name));
      else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Có lỗi xảy ra. Vui lòng thử lại");
      }
    });
  };
};

export const changeReceiver = (id, name) => {
  return {
    type: types.CHANGE_RECEIVER,
    id,
    name,
  };
};

export const fetListDebtsByUser = (data) => {
  return {
    type: types.FETCH_LIST_DEBT_BY_USER,
    data,
  };
};

export const fetListDebtsToUser = (data) => {
  return {
    type: types.FETCH_LIST_DEBT_TO_USER,
    data,
  };
};

export const fetchListDebts_allReq = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    let ResDebtsByUser = await callApi(
      "user/list-debts",
      "POST",
      { debt_type: 1 },
      token
    );
    if (ResDebtsByUser.data.code === 0)
      dispatch(fetListDebtsByUser(ResDebtsByUser.data.data.list_debtors));
    let ResDebtsToUser = await callApi(
      "user/list-debts",
      "POST",
      { debt_type: 2 },
      token
    );
    if (ResDebtsToUser.data.code === 0)
      dispatch(fetListDebtsToUser(ResDebtsToUser.data.data.list_debts));
  };
};

export const addDebt = (debt) => {
  return {
    type: types.ADD_DEBT,
    debt,
  };
};

export const addDebtReq = (id, amount, des) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "user/save-debtor",
      "POST",
      {
        debtor_account_number: id,
        amount: amount,
        description: des,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        alert("Thêm nhắc nợ thành công!");
        dispatch(addDebt(res.data.data));
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Có lỗi xảy ra. Vui lòng thử lại");
      }
    });
  };
};

export const cancelDebt_byUser = (id, des) => {
  return {
    type: types.CANCEL_DEBT_BY_USER,
    id,
    des,
  };
};

export const cancelDebt_byUserReq = (id, des) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "user/cancel-debt",
      "POST",
      {
        debt_id: id,
        description: des,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        dispatch(cancelDebt_byUser(id, des));
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Có lỗi xảy ra. Vui lòng thử lại");
      }
    });
  };
};

export const cancelDebt_toUser = (id, des) => {
  return {
    type: types.CANCEL_DEBT_TO_USER,
    id,
    des,
  };
};

export const cancelDebt_toUserReq = (id, des) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "user/cancel-debt",
      "POST",
      {
        debt_id: id,
        description: des,
      },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) {
        dispatch(cancelDebt_toUser(id, des));
      } else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Có lỗi xảy ra. Vui lòng thử lại");
      }
    });
  };
};

export const fetchNotifications = (data) => {
  return {
    type: types.FETCH_NOTIFICATIONS,
    data,
  };
};

// GET notification lúc vừa đăng nhập
export const firstfetchNotificationsReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("user/get-notification", "GET", null, token).then((res) => {
      if (res.data.code === 0) {
        const list_notifi = res.data.data;
        let num = 0;
        list_notifi.forEach((item) => {
          if (item.status === 0) {
            num++;
            // Has unread notification
          }
        });
        if (num !== 0) dispatch(toogle_newNotifi(true, num));
        dispatch(fetchNotifications(res.data.data));
      } else {
        console.log(res.data.message + " : " + res.data.code);
      }
    });
  };
};

// GET notification trong phiên sử dụng
export const fetchNotificationsReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("user/get-notification", "GET", null, token).then((res) => {
      if (res.data.code === 0) {
        const oldNum = store.getState().notifications.length;
        const newNum = res.data.data.length;
        // Số noti tăng lên trong phiên làm việc
        if (oldNum < newNum) {
          const list_notifi = res.data.data;
          let num = 0;
          list_notifi.forEach((item) => {
            if (item.status === 0) {
              num++;
              // Has unread notification
            }
          });
          dispatch(toogle_newNotifi(true, num));
          dispatch(fetchNotifications(res.data.data));
        }
      } else {
        console.log(res.data.message + " : " + res.data.code);
      }
    });
  };
};

export const toogle_newNotifi = (status, num) => {
  return {
    type: types.TOGGLE_NEWNOTIFI,
    status,
    num,
  };
};

export const toogle_showNotifi = () => {
  return {
    type: types.TOGGLE_SHOW_NOTIFI,
  };
};

export const hide_notifi = () => {
  return {
    type: types.HIDE_NOTIFI,
  };
};

export const read_all_notifi = () => {
  return {
    type: types.READ_ALL_NOTIFI,
  };
};

export const read_all_notifiReq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("user/read-all", "GET", null, token).then((res) => {
      if (res.data.code === 0) {
        dispatch(read_all_notifi());
      } else {
        console.log(res.data.message + " : " + res.data.code);
      }
    });
  };
};

export const read_a_notification = (id) => {
  return {
    type: types.READ_A_NOTIFICATION,
    id,
  };
};

export const read_a_notificationReq = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(`user/read-notification?id=${id}`, "GET", null, token).then(
      (res) => {
        if (res.data.code === 0) {
          dispatch(read_a_notification(id));
        } else {
          console.log(res.data.message + " : " + res.data.code);
        }
      }
    );
  };
};

export const fetchDebtDetail = (data) => {
  return {
    type: types.FETCH_DEBT_DETAIL,
    data,
  };
};

export const fetchDebtDetailReq = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi("user/get-debt", "POST", { debt_id: id }, token).then(
      (res) => {
        if (res.data.code === 0) {
          dispatch(fetchDebtDetail(res.data.data));
        } else {
          console.log(res.data.message + " : " + res.data.code);
        }
      }
    );
  };
};
