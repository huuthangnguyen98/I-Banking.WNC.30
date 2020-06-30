import { combineReducers } from "redux";
import Auth from "./Auth";
import customerProfile from "./Customer/customerProfile";
import listAccount from "./Customer/listAccount";
import listReceivers from "./Customer/listReceivers";
import listDebts from "./Customer/listDebts";
export default combineReducers({
    Auth,
    customerProfile,
    listAccount,
    listReceivers,
    listDebts,
});
