import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    teams: [],
    teamDetails: [],
    userDetails: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TEAM_START:
            return {
                ...state,
                loading: true
            };
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
        case actionTypes.FETCH_TEAM_DETAILS_START:
            return {
                ...state,
                loading: true,
                teamDetails: []
            };
        case actionTypes.FETCH_TEAM_DETAILS_SUCCESS:
            console.log(action.teamDetails.users)
            const userDetails = action.teamDetails.users.map(team => {
                return {
                    [team.userId]: team
                }
            });
            return {
                ...state,
                loading: false,
                teamDetails: state.teamDetails.concat(action.teamDetails),
                // teamDetails: {
                //     ...state,
                //     teamDetails: state.teamDetails.concat(action.teamDetails),
                //     // userDetails
                // },
            };
        default:
            return state;
    }
};

export default reducer;