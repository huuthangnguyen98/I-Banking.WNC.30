import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
var data = {
    user: {
        name: "Huu Thang Nguyen",
        email: "huuthangnguyen98@gmail.com",
        phone: "0977190471",
    },
    account: [
        {
            id: "123",
            amount: "20$",
            class: 0,
        },
        {
            id: "456",
            amount: "20$",
            class: 1,
        },
    ],
    rlist: [{ id: "0", name: "ok" }],
};

//
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
// export const fetchInfoReq = () => {
//     return (dispatch) => {
//         dispatch(fetchInfo());
//     };
// };
// export const fetchInfoReq = () => {
//     return (dispatch) => {
//         return callApi("", "GET", null).then((res) => {
//             dispatch(fetchInfo(res.data));
//         });
//     };
// };

export const fetchReceivers = ({ debts, debtors }) => {
    return {
        type: types.FETCH_RECEIVERS,
        debts,
        debtors
    };
};

export const fetchReceiversReq = () => {
    return (dispatch) => {
        callApi("user/list-debts", "POST", {
            "debt_type": 3
        }).then((res) => {
            if (res && res.data && res.data.data && res.data.data.list_debtors && res.data.data.list_debts) {

                return dispatch(fetchReceivers({ debtors: res.data.data.list_debtors, debts: res.data.data.list_debts }));

            } else {
                return dispatch(fetchReceivers([]));
            }
        })
    };
};

export const addReceiver = (id, name) => {
    return {
        type: types.ADD_RECEIVER,
        name,
        id,
    };
};

export const addDebt = (debtInfo) => {
    return {
        type: types.ADD_DEBT,
        debtInfo
    }
};


export const addDebtReq = ({ id, amount, description }) => {
    return (dispatch) => {
        callApi("user/save-debtor", "POST", { debtor_account_number: id, amount, description }).then((res) => {
            if (res && res.data && res.data.data && res.data.data.debtor_account_number == id) {
                dispatch(addDebt(res.data.data));
            }
        })
    };
};

export const removeReceiver = (id) => {
    return {
        type: types.REMOVE_RECEIVER,
        id,
    };
};

export const changeReceiver = (id, name) => {
    return {
        type: types.CHANGE_RECEIVER,
        id,
        name,
    };
};
