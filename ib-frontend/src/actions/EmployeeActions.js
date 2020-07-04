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
            { to_account_number: id },
            token
        ).then((res) => {
            //console.log(res);
            if (res.data.code === 0) alert("Nạp tiền thành công!");
            else alert("Nạp tiền thất bại! Vui lòng thử lại");
        });
    };
};
