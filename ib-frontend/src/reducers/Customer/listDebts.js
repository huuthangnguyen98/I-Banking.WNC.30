import * as types from "../../constants/ActionTypes";
import { objectIndexOf } from "../../utils/general";
var intState = {
    debts: [],
    debtors: []
};
var newState;
const listDebts = (state = intState, action) => {
    switch (action.type) {
        // case types.ADD_RECEIVER:
        //     newState = [...state, { id: action.id, name: action.name }];
        //     return newState;
        // case types.REMOVE_RECEIVER:
        //     newState = state.filter((item) => item.id !== action.id);
        //     return newState;
        // case types.CHANGE_RECEIVER:
        //     newState = [...state];
        //     newState.forEach((item) => {
        //         if (item.id === action.id) item.name = action.name;
        //     });
        //     return newState;
        case types.FETCH_RECEIVERS:
            return {
                ...state,
                debts: action.debts,
                debtors: action.debtors
            };
        case types.ADD_DEBT:

            let newDebtors = [action.debtInfo, ...state.debtors]
            return {
                ...state,
                debtors: newDebtors
            }
        case types.PAY_DEBT:

            let indexOfWillPayDebt = objectIndexOf(state.debts, action.debtId, 'debtor_id');
            let newDebts = [...state.debts];
            if (indexOfWillPayDebt > -1) {
                newDebts[indexOfWillPayDebt].status = 0;
            }
            return {
                ...state,
                debts: newDebts
            }
        case types.CANCEL_DEBT:
            let newReplaceDebts;
            if (action.isDebtOwner) {
                newReplaceDebts = {
                    debtors: [
                        ...state.debtors
                    ]
                }
            } else {
                newReplaceDebts = {
                    debts: [
                        ...state.debts
                    ]
                }
            }
            let targetDebtArray = action.isDebtOwner ? newReplaceDebts.debtors : newReplaceDebts.debts;
            let indexOfWillCancelDebt = objectIndexOf(targetDebtArray, action.debtId, 'debtor_id');
            if (indexOfWillCancelDebt > -1) {
                targetDebtArray[indexOfWillCancelDebt].status = 2;
            }

            return {
                ...state,
                ...newReplaceDebts
            }
        default:
            return state;
    }
};

export default listDebts;
