import db from '../../config/FireBase';
import firebase from 'firebase/app';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const login = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const fetchCurrentUserSuccess = (user) => {
    return {
        type: actionTypes.AUTH_CURRENT_USER,
        currentUser: user
    };
}

export const fetchCurrentUser = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(fetchCurrentUserSuccess(user))
            } else {
            // No user is signed in.
            }
        });
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(login(token, userId));
        }
    };
};

export const authCreateUser = (email, name, userId) => {
    return dispatch => {
        const userData = {
            email,
            name,
            userId
        };
        db.collection('users').doc(userId).set(userData)
            .then(() => {
                console.log('user Successfully created');
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const auth = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(authStart);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(u => {
                firebase.auth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        const token = idTokenResult.token;
                        const userId = u.user.uid;
                        const name = u.user.displayName;
                        console.log('name', name)
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', userId)

                        if (isSignIn) dispatch(authCreateUser(email, name, userId));

                        dispatch(login(token, userId))
                        console.log('Successfully Logged in');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(err => {
                console.log('Error: ', err.toString());
            });
    };
};

// =============

export const authSignIn = (email, password, name) => {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(u => {
                const isSignIn = true;

                firebase.auth().currentUser.updateProfile({
                    displayName: name
                });
                dispatch(auth(email, password, isSignIn));
            })
            .catch(err => {
                console.log('Error: ', err.toString())
            });
    };
};