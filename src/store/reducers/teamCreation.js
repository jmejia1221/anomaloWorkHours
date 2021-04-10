import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    teams: [],
    teamDetails: [],
    teamUsers: [],
    weekTeamHourList: []
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
                teamDetails: [],
                teamUsers: []
            };
        case actionTypes.FETCH_TEAM_DETAILS_SUCCESS:
            const userDetails = action.teamDetails.users.map(team => {
                return team;
            });
            return {
                ...state,
                loading: false,
                teamDetails: state.teamDetails.concat(action.teamDetails),
                teamUsers: state.teamUsers.concat(userDetails)
            };
        case actionTypes.FETCH_WEEK_TEAM_HOURS_START:
            return {
                ...state,
                weekTeamHourList: []
            }
        case actionTypes.FETCH_WEEK_TEAM_HOURS_SUCCESS:
            return {
                ...state,
                loading: false,
                weekTeamHourList: state.weekTeamHourList.concat(action.weekTeamHourList)
            };
        default:
            return state;
    }
};

export default reducer;