import * as types from "../../constants/ActionTypes";
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
        default:
            return state;
    }
};

export default listDebts;
