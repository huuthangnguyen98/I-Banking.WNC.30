import * as types from "../../constants/ActionTypes";
var intState = [];
//receiver_bank, receiver_account_number, receiver_name
var newState;
const listReceivers = (state = intState, action) => {
    switch (action.type) {
        case types.ADD_RECEIVER:
            newState = [
                ...state,
                {
                    receiver_account_number: action.id,
                    receiver_name: action.name,
                    receiver_bank: action.bank,
                },
            ];
            return newState;
        case types.REMOVE_RECEIVER:
            newState = state.filter(
                (item) => item.receiver_account_number !== action.id
            );
            return newState;
        case types.CHANGE_RECEIVER:
            newState = [...state];
            newState.forEach((item) => {
                if (item.receiver_account_number === action.id)
                    item.receiver_name = action.name;
            });
            return newState;
        case types.FETCH_RECEIVERS:
            newState = action.listReceivers;

            return newState;
        default:
            return state;
    }
};

export default listReceivers;
