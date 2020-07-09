import { combineReducers } from "redux";
import Auth from "./Auth";
import customerProfile from "./Customer/customerProfile";
import listAccount from "./Customer/listAccount";
import listReceivers from "./Customer/listReceivers";
import listDebts from "./Customer/listDebts";
import historyPayIn from "./Transactions/historyPayIn";
import historyTransfer from "./Transactions/historyTransfer";
import historyDebt from "./Transactions/historyDebt";
import allTypesTrans from "./Transactions/allTypesTrans";
import listEmployee from "./Admin/listEmployee";
export default combineReducers({
  Auth,
  customerProfile,
  listAccount,
  listReceivers,
  listDebts,
  historyPayIn,
  historyTransfer,
  historyDebt,
  allTypesTrans,
  listEmployee,
});
