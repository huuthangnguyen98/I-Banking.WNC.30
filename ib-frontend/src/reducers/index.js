import { combineReducers } from "redux";
import employee from "./Employee";
import Auth from "./Auth";
import Customer from "./Customer";
import customerProfile from "./Customer/customerProfile";
import listAccount from "./Customer/listAccount";
import listReceivers from "./Customer/listReceivers";
export default combineReducers({
    employee,
    Auth,
    Customer,
    customerProfile,
    listAccount,
    listReceivers,
});
