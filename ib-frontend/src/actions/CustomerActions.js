import * as types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { changePw } from "./index";
import { defaultBank } from "../constants/config";
// var data = {
//     user: {
//         name: "Huu Thang Nguyen",
//         email: "huuthangnguyen98@gmail.com",
//         phone: "0977190471",
//     },
//     account: [
//         {
//             id: "123",
//             amount: "20$",
//             class: 0,
//         },
//         {
//             id: "456",
//             amount: "20$",
//             class: 1,
//         },
//     ],
//     rlist: [{ id: "0", name: "ok" }],
// };

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

export const fetchListAccountReq = () => {
    const token = localStorage.getItem("token");
    //console.log("fetch list account");

    return (dispatch) => {
        return callApi("user/list-account", "GET", null, token).then((res) => {
            // console.log(res.data.data);
            let list = res.data.data;
            dispatch(fetchListAccount(list));
        });
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
            if (res.data.code === 0) {
                const listReceivers = res.data.data;
                //console.log(listReceivers);
                dispatch(fetchReceivers(listReceivers));
            }
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

export const checkAccountValid = (id, bank = defaultBank) => {
    const token = localStorage.getItem("token");
    return callApi("account/info", "POST", { account_number: id }, token).then(
        (res) => {
            if (res.data.code !== 0)
                alert("Số tài khoản không hợp lệ/ không tồn tại.");
        }
    );
};

export const addReceiverReq = (id, name, bank) => {
    const token = localStorage.getItem("token");
    return (dispatch) => {
        return callApi(
            "account/info",
            "POST",
            { account_number: id },
            token
        ).then((res) => {
            if (res.data.code === 0) {
                //console.log(res.data.data.account_name);

                // console.log(res.data.account_name);
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
                    }
                });
            } else alert("Số tài khoản không hợp lệ. Vui lòng thử lại");
        });
    };
};

// export const sendEmail = (email) => {
//     return (dispatch) => {
//         return callApi("user/forgot-password", "POST", { email: email }).then(
//             (res) => {
//                 console.log(res);
//                 if (res.data.code === 0) {
//                 } else {
//                     alert("Email không hợp lệ. Vui lòng thử lại");
//                 }
//             }
//         );
//     };
// };
const defaultPw = "123456aA@";
export const sendOtp = (email, otp, newpw) => {
    return (dispatch) => {
        return callApi("user/reset-password", "POST", {
            email: email,
            otp: otp,
        }).then((res) => {
            console.log(res);
            if (res.data.code === 0) {
                console.log("susscess otp");
                const token = res.data.data;
                dispatch(changePw(defaultPw, newpw, token));
            } else {
                alert("Mã OTP không chính xác. Vui lòng thử lại");
            }
        });
    };
};

export const sendOtpTransfer = (trans) => {
    const token = localStorage.getItem("token");
    return () => {
        return callApi("account/transfer", "POST", trans, token).then((res) => {
            if (res.data.code === 0) {
                console.log(res.data);

                localStorage.setItem("transId", res.data.data.transaction_id);
                console.log(res.data.data.transaction_id);

                //console.log(res);
            } else alert("Giao dịch không thành công. Vui lòng thử lại!");
        });
    };
};

export const confirmTransfer = (otp) => {
    const token = localStorage.getItem("token");
    const transaction_id = localStorage.getItem("transId");

    console.log(transaction_id);

    return (dispatch) => {
        return callApi(
            "account/capture-transfer",
            "POST",
            { transaction_id, otp },
            token
        ).then((res) => {
            console.log(res);
            if (res.data.code === 0) {
                alert("Chuyển khoản thành công!");
                dispatch(fetchListAccountReq());
            } else {
                alert("Chuyển khoản thất bại. Vui lòng thử lại");
            }
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
        return callApi(
            "user/remove-receiver",
            "POST",
            {
                account_number: id,
            },
            token
        ).then((res) => {
            if (res.data.code === 0) dispatch(removeReceiver(id));
            else alert("Có lỗi xảy ra. Vui lòng thử lại");
        });
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
