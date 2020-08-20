import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { show_spinner, hide_spinner } from "./index";

export const createCustomer = (customer) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi("user/create", "POST", customer, token).then((res) => {
      //hide spinner 
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) alert("Tạo tài khoản thành công!");
      else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Tạo tài khoản thất bại! Vui lòng thử lại");
      }
    });
  };
};
//done here

export const payIn = (id, amount) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(
      "account/pay-in",
      "POST",
      { to_account_number: id, amount },
      token
    ).then((res) => {
      //hide spinner
      dispatch(hide_spinner());
      // //
      if (res.data.code === 0) alert("Nạp tiền thành công!");
      else {
        console.log(res.data.message + " : " + res.data.code);
        alert("Nạp tiền thất bại! Vui lòng thử lại");
      }
    });
  };
};

export const getHistoryReq = (id, type) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    // show spinner
    dispatch(show_spinner());
    // //

    return callApi(
      "account/list-transactions",
      "POST",
      { account_number: id, transaction_type: type },
      token
    ).then((res) => {
      // 1 chuyển khoản
      // 2 thanh toán nợ
      // 3 nhận tiền

      // hide spinner
      dispatch(hide_spinner());

      switch (type) {
        case 1:
          dispatch(fetchHistoryTransfer(res.data.data.list_transfers));
          break;
        case 2:
          dispatch(fetchHistoryDebt(res.data.data.list_debts));
          break;
        case 3:
          dispatch(fetchHistoryPayin(res.data.data.list_pay_in));
          break;
        case 4:
          const allTrans = [
            ...res.data.data.list_transfers,
            ...res.data.data.list_debts,
            ...res.data.data.list_pay_in,
          ].sort((a, b) => b.transaction_id - a.transaction_id);
          dispatch(fetchAllTypesTrans(allTrans));
          break;
        default:
      }
    });
  };
};

export const fetchHistoryPayin = (data) => {
  return {
    type: types.FETCH_LIST_PAYIN,
    data,
  };
};

export const fetchHistoryTransfer = (data) => {
  return {
    type: types.FETCH_LIST_TRANSER,
    data,
  };
};

export const fetchHistoryDebt = (data) => {
  return {
    type: types.FETCH_LIST_DEBT,
    data,
  };
};

export const fetchAllTypesTrans = (data) => {
  return {
    type: types.FETCH_ALL_TYPES_TRANS,
    data,
  };
};
