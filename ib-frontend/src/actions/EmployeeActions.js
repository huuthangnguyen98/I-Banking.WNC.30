import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const createCustomer = (customer) => {
  let token = localStorage.getItem("token");
  //console.log(token);
  return () => {
    return callApi("user/create", "POST", customer, token).then((res) => {
      //console.log(res);
      if (res.data.code === 0) alert("Tạo tài khoản thành công!");
      else alert("Tạo tài khoản thất bại! Vui lòng thử lại");
    });
  };
};

export const payIn = (id, amount) => {
  let token = localStorage.getItem("token");
  return () => {
    return callApi(
      "account/pay-in",
      "POST",
      { to_account_number: id, amount },
      token
    ).then((res) => {
      //console.log(res);
      if (res.data.code === 0) alert("Nạp tiền thành công!");
      else alert("Nạp tiền thất bại! Vui lòng thử lại");
    });
  };
};

export const getHistoryReq = (id, type) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    return callApi(
      "account/list-transactions",
      "POST",
      { account_number: id, transaction_type: type },
      token
    ).then((res) => {
      // 1 chuyển khoản
      // 2 thanh toán nợ
      // 3 nhận tiền
      switch (type) {
        case 1:
          dispatch(fetchHistoryTransfer(res.data.data.list_transfers));
          break;
        case 2:
          dispatch(fetchHistoryDebt(res.data.data.list_debts));
          break;
        case 3:
          dispatch(fetchHistoryPayin(res.data.data.list_pay_in));
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
      //console.log(res);
      //   res.data.data.list_transfers.map((item) => console.log(item.type));
      //   dispatch(fetchHistory(res.data.data.list_transfers));
      //if (res.data.code === 0)
      //console.log();
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
// export const getAccountInfo = (id) => {
//     let token = localStorage.getItem("token");
//     return () => {
//         return callApi(
//             "account/info",
//             "POST",
//             { account_number: id },
//             token
//         ).then((res) => {
//             console.log(res);
//             if (res.data.code === 0) alert("Nạp tiền thành công!");
//             else alert("Nạp tiền thất bại! Vui lòng thử lại");
//         });
//     };
// }
