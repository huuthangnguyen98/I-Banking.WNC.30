import * as types from "../constants/ActionTypes";
//import callApi from "../utils/apiCaller";

export const addCustomer = () => {
    return {
        type: types.ADD_CUSTOMER,
    };
};

// export const login = (username, pwd) => {
//     return (dispatch) => {
//         return callApi("auth", "POST", {
//             username,
//             pwd,
//         }).then((res) => {
//             //console.log(res.data);
//             if (res.data.accessToken) {
//                 if (res.data.role === 1) dispatch(loginCustomer());
//                 if (res.data.role === 2) dispatch(loginEmployee());
//                 if (res.data.role === 3) dispatch(loginAdmin());
//             }
//         });
//     };
// };

export const login = (username) => {
    return (dispatch) => {
        //console.log(res.data);
        if (username === "customer") dispatch(loginCustomer());
        if (username === "employee") dispatch(loginEmployee());
        if (username === "admin") dispatch(loginAdmin());
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
    return {
        type: types.LOGOUT,
    };
};
