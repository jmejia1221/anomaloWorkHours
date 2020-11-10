import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    teams: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                teams: state.teams.concat(action.teams)
            };
        case actionTypes.FETCH_TEAM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                teams: action.teams
            };
    
        default:
            return state;
    }
};

export default reducer;