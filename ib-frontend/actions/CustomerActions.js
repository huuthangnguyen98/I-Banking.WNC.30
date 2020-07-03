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

const rlist = [];
export const fetchReceivers = () => {
    return {
        type: types.FETCH_RECEIVERS,
        rlist,
    };
};

// export const fetchReceiversReq = () => {
//     return (dispatch) => {
//         dispatch(fetchReceivers());
//     };
// };

export const addReceiver = (id, name, bank) => {
    return {
        type: types.ADD_RECEIVER,
        name,
        id,
        bank,
    };
};

// export const addReceiverReq = (id, name, bank) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         // Check if acoount exist
//         return callApi(
//             "account/info",
//             "POST",
//             { account_number: id },
//             token
//         ).then((res) => {
//             // console.log(res);

//             if (res.data.code === 0) {
//                 return callApi("user/save-receiver", "POST", {
//                     account_bank: bank,
//                     account_number: id,
//                     account_name: name,
//                 }).then((res) => {
//                     console.log(res);
//                     dispatch(addReceiver(id, name, bank));
//                 });
//             }
//         });
//         //dispatch(addReceiver({ id, name, bank }));
//     };
// };

export const addReceiverReq = (id, name, bank) => {
    const token = localStorage.getItem("token");
    return (dispatch) => {
        return callApi(
            "user/save-receiver",
            "POST",
            { account_bank: bank, account_number: id, account_name: name },
            token
        ).then((res) => {
            // console.log(res);

            if (res.data.code === 0) {
                dispatch(addReceiver(id, name, bank));
            } else alert("Số tài khoản không hợp lệ. Vui lòng thử lại");
        });
    };
};

export const removeReceiver = (id) => {
    return {
        type: types.REMOVE_RECEIVER,
        id,
    };
};

export const changeReceiverReq = (id, name) => {
    const token = localStorage.getItem("token");
    return (dispatch) => {
        return callApi(
            "user/update-receiver",
            "POST",
            {
                account_number: id,
                account_name: name,
            },
            token
        ).then((res) => {
            if (res.data.code === 0) dispatch(changeReceiver(id, name));
            else alert("Có lỗi xảy ra. Vui lòng thử lại");
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
