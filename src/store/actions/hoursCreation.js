import db from '../../config/FireBase';
import * as actionTypes from './actionTypes';

export const startTask = () => {
    return {
        type: actionTypes.CREATE_TASK_START
    };
};

export const createTaskSucces = (id, taskData) => {
    return {
        type: actionTypes.CREATE_TASK_SUCCESS,
        taskId: id,
        taskData: taskData
    };
};

export const createTaskError = (err) => {
    return {
        type: actionTypes.CREATE_TASK_FAIL,
        error: err
    };
};

export const createTask = (taskData) => {
    return dispatch => {
        dispatch(startTask());
        db.collection('tasks').doc(taskData.userId.toString()).collection('taskList').doc(taskData.id.toString()).set(taskData)
            .then(() => {
                dispatch(createTaskSucces(taskData.userId, taskData))
            })
            .catch(err => {
                dispatch(createTaskError(err));
            });
    };
};

// ========== //

export const fetchTaskStart = () => {
    return {
        type: actionTypes.FETCH_TASK_START
    };
};

export const fetchTaskSuccess = (taskData) => {
    return {
        type: actionTypes.FETCH_TASK_SUCCESS,
        tasks: taskData
    };
};

export const fetchTaskFail = (err) => {
    return {
        type: actionTypes.FETCH_TASK_FAIL,
        error: err
    };
};

export const fetchTask = (userId) => {
    return dispatch => {
        dispatch(fetchTaskStart)
        db.collection('tasks').doc(userId.toString()).collection('taskList').get()
            .then(querySnapshot => {
                const fetchDataTask = [];
                querySnapshot.forEach(function(res) {
                    fetchDataTask.push(res.data());
                });
                dispatch(fetchTaskSuccess(fetchDataTask));
            })
            .catch(err => {
                dispatch(fetchTaskFail(err));
            });
    };
};