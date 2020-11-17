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
        dispatch(createTeamStart());
        db.collection('teams').add(teamData)
            .then((doc) => {
                const newTeamData = {
                    ...teamData,
                    id: doc.id
                }
                dispatch(createTeamSuccess(newTeamData));
            })
            .catch(err => {
                console.log('err');
            });
    };
};

// ========= Team

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
                    const dataWithId = {
                        ...doc.data(),
                        id: doc.id
                    };
                    fetchTeamData.push(dataWithId);
                });
                dispatch(fetchTeamSuccess(fetchTeamData));
            })
            .catch(err => {
                console.log('err', err);
            });
    };
};

// ========= Team Details

export const fetchTeamDetailsStart = () => {
    return {
        type: actionTypes.FETCH_TEAM_DETAILS_START
    };
};

export const fetchTeamDetailsSuccess = (teamDetails, id) => {
    return {
        type: actionTypes.FETCH_TEAM_DETAILS_SUCCESS,
        teamDetails: teamDetails,
        userId: id
    };
};

export const fetchTeamDetails = (teamId) => {
    return dispatch => {
        dispatch(fetchTeamDetailsStart());
        db.collection('teams').doc(teamId).get()
            .then(doc => {
                dispatch(fetchTeamDetailsSuccess(doc.data(), doc.data().userId));
            })
            .catch(err => {
                console.log('err', err)
            });
    };
};