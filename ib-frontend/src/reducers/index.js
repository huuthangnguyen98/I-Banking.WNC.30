import { combineReducers } from "redux";
import Auth from "./Auth";
import customerProfile from "./Customer/customerProfile";
import listAccount from "./Customer/listAccount";
import listReceivers from "./Customer/listReceivers";
import historyPayIn from "./Transactions/historyPayIn";
import historyTransfer from "./Transactions/historyTransfer";
import historyDebt from "./Transactions/historyDebt";
import allTypesTrans from "./Transactions/allTypesTrans";
import listEmployee from "./Admin/listEmployee";
import listDebtsByUser from "./Customer/listDebtsByUser";
import listDebtsToUser from "./Customer/listDebtsToUser";
import UIState from "./UIState";
import notifications from "./Customer/notifications";
import debtDetail from "./Customer/debtDetail";
import Partners from "./Partners";
import statistic from "../reducers/Admin/statistic";
export default combineReducers({
  Auth,
  customerProfile,
  listAccount,
  listReceivers,
  historyPayIn,
  historyTransfer,
  historyDebt,
  allTypesTrans,
  listEmployee,
  listDebtsByUser,
  listDebtsToUser,
  UIState,
  notifications,
  debtDetail,
  Partners,
  statistic,
});
