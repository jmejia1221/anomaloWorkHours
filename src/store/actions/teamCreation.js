import * as actionTypes from './actionTypes';
import db from '../../config/FireBase';


export const createTeamStart = () => {
    return {
        type:  actionTypes.CREATE_TEAM_START
    };
};

export const createTeamSuccess = (teamData) => {
    return {
        type: actionTypes.CREATE_TEAM_SUCCESS,
        teams: teamData
    };
};

export const createTeam = (teamData) => {
    return dispatch => {
        dispatch(createTeamStart);
        db.collection('teams').add(teamData)
            .then(() => {
                console.log('team Successfully created');
                dispatch(createTeamSuccess(teamData))
            })
            .catch(err => {
                console.log('err');
            });
    };
};

// =========

export const fetchTeamsStart = () => {
    return {
        type: actionTypes.FETCH_TEAM_START
    };
};

export const fetchTeamSuccess = (teamData) => {
    return {
        type: actionTypes.FETCH_TEAM_SUCCESS,
        teams: teamData
    };
};

export const fetchTeams = (userId) => {
    return dispatch => {
        dispatch(fetchTeamsStart());
        db.collection('teams').where("userId", "==", userId.toString()).get()
            .then(snap => {
                let fetchTeamData = [];
                snap.forEach(doc => {
                    fetchTeamData.push(doc.data());
                });
                dispatch(fetchTeamSuccess(fetchTeamData));
            })
            .catch(err => {
                console.log('err', err)
            });
    };
};