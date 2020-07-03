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
            let role = res.data.data.role;
            //console.log(res.data.data);
            if (role === 1) dispatch(loginCustomer());
            if (role === 2) dispatch(loginEmployee());
            if (role === 3) dispatch(loginAdmin());
            localStorage.setItem("username", res.data.data.full_name);
            const data = {
                name: res.data.data.full_name,
                email: res.data.data.email,
                phone: res.data.data.phone,
            };
            // console.log(data);
            dispatch(fetchInfo(data));
            return callApi("user/list-account", "GET", null, token).then(
                (res) => {
                    // console.log(res.data.data);
                    let list = res.data.data;
                    dispatch(fetchListAccount(list));
                }
            );
        });
    };
};
export const login = (username, pwd) => {
    return (dispatch) => {
        return callApi("authenticate", "POST", {
            username,
            password: pwd,
        }).then((res) => {
            if (res.data.data) {
                localStorage.setItem("token", res.data.data);

                //dispatch(loginEmployee());

                let token = res.data.data;
                return dispatch(loginWithToken(token));
                //dispatch(fetchInfo());
                // return callApi("user/info", "GET", null, token).then((res) => {
                //     let role = res.data.data.role;
                //     //console.log(res.data.data);
                //     if (role === 1) dispatch(loginCustomer());
                //     if (role === 2) dispatch(loginEmployee());
                //     if (role === 3) dispatch(loginAdmin());
                //     localStorage.setItem("username", res.data.data.full_name);
                //     const data = {
                //         name: res.data.data.full_name,
                //         email: res.data.data.email,
                //         phone: res.data.data.phone,
                //     };
                //     // console.log(data);
                //     dispatch(fetchInfo(data));
                //     return callApi(
                //         "user/list-account",
                //         "GET",
                //         null,
                //         token
                //     ).then((res) => {
                //         // console.log(res.data.data);
                //         let list = res.data.data;
                //         dispatch(fetchListAccount(list));
                //     });
                // });
            } else dispatch(wrongLogging());
        });
    };
};

// export const login = (username) => {
//     return (dispatch) => {
//         // if (username === "customer") dispatch(loginCustomer());
//         // if (username === "employee") dispatch(loginEmployee());
//         // if (username === "admin") dispatch(loginAdmin());
//         return callApi("user/info", "GET").then((res) => console.log(res.data));
//     };
// };

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
