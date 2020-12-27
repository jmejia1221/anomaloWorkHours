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
            .then((docs) => {
                const teamWithId = {
                    id: docs.id,
                    ...teamData
                }
                dispatch(createTeamSuccess(teamWithId));
            })
            .catch(err => {
                console.log('err', err);
            });
    };
};

// ========= Remove team

export const removeTeam = (userId, teamId) => {
    return dispatch => {
        db.collection('teams').doc(teamId.toString()).delete()
            .then(() => {
                console.log('Successfully deleted');
                dispatch(fetchTeams(userId))
            })
            .catch(err => {
                console.log('error', err)
            });
    };
};

// ========= Update team

export const updateTeamStart = () => {
    return {
        type:  actionTypes.UPDATE_TEAM_START
    };
};

export const updateTeamSuccess = (teamData) => {
    return {
        type: actionTypes.UPDATE_TEAM_SUCCESS,
        teams: teamData
    };
};

export const updateTeam = (teamData) => {
    return dispatch => {
        dispatch(createTeamStart());
        db.collection('teams').doc(teamData.id.toString()).update(teamData)
            .then(() => {
                dispatch(fetchTeams(teamData.userId))
            })
            .catch(err => {
                console.log('err', err);
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
        db.collection('teams').doc(teamId.toString()).get()
            .then(doc => {
                const dataWithId = {
                    id: doc.id,
                    ...doc.data()
                };
                dispatch(fetchTeamDetailsSuccess(dataWithId, doc.data().userId));
            })
            .catch(err => {
                console.log('err', err)
            });
    };
};