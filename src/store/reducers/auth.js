import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    currentUser: null
};

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        userId: action.userId,
        token: action.token
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    };
};

const fetchCurrentUser = (state, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_CURRENT_USER:
            return fetchCurrentUser(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;