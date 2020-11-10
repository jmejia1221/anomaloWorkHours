import * as actionTypes from './actionTypes';
import db from '../../config/FireBase';

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
}

export const removeUsers = () => {
    return {
        type: actionTypes.REMOVE_USERS,
        users: []
    }
}

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersStart());
        db.collection("users").limit(10).get().then(function(querySnapshot) {
            const fetchDataUsers = [];
            querySnapshot.forEach(function(doc) {
                fetchDataUsers.push(doc.data());
            });
            dispatch(fetchUsersSuccess(fetchDataUsers));
        });
    };
};