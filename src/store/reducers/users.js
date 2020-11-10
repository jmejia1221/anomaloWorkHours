import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    users: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: state.users.concat(action.users)
            };
        case actionTypes.REMOVE_USERS:
            return {
                loading: false,
                users: action.users
            }
    
        default:
            return state;
    }
};

export default reducer;