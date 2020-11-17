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
        weekTasks: taskData
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
        console.log('mytask', taskData)
        db.collection('tasks').doc(taskData.userId.toString()).collection('taskList').add(taskData)
            .then(() => {
                dispatch(createTaskSucces(taskData.id, taskData))
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
        tasks: taskData,
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
        dispatch(fetchTaskStart());
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

// ======= //
// TODO: create a new action and reducer for task details
export const fetchTaskDetailStart = () => {
    return {
        type: actionTypes.FETCH_TASK_DETAIL_START
    };
};

export const fetchTaskDetailSuccess = (taskData, userId) => {
    return {
        type: actionTypes.FETCH_TASK_DETAIL_SUCCESS,
        tasks: taskData,
        taskUserId: userId
    };
};

export const fetchTaskDetailFail = (err) => {
    return {
        type: actionTypes.FETCH_TASK_DETAIL_FAIL,
        error: err
    };
};

export const fetchTaskDetail = (userId, week, weekDay) => {
    return dispatch => {
        const weekComputed = week - weekDay;
        dispatch(fetchTaskDetailStart());
        db.collection('tasks').doc(userId.toString()).collection('taskList').where('week', '==', weekComputed).where('weekDay', '==', weekDay).limit(50).get()
            .then(querySnapshot => {
                const fetchDataTask = [];
                querySnapshot.forEach(function(res) {
                    fetchDataTask.push(res.data());
                });
                dispatch(fetchTaskDetailSuccess(fetchDataTask, userId));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchTaskDetailFail(err));
            });
    };
}

// Week tasks
export const fetchWeekTasksStart = () => {
    return {
        type: actionTypes.FETCH_WEEK_TASKS_START
    };
};

export const fetchWeekTasksSuccess = (weekTasks) => {
    return {
        type: actionTypes.FETCH_WEEK_TASKS_SUCCESS,
        weekTasks 
    }
}

export const fetchWeekTasks = (userId, week, weekDay) => {
    return dispatch => {
        const weekComputed = week - weekDay;
        dispatch(fetchWeekTasksStart());
        db.collection('tasks').doc(userId.toString()).collection('taskList').where('week', '==', weekComputed).where('weekDay', '==', weekDay).limit(50).get()
            .then(querySnapshot => {
                const fetchDataTask = [];
                querySnapshot.forEach(function(res) {
                    fetchDataTask.push(res.data());
                });
                console.log(fetchDataTask)
                dispatch(fetchWeekTasksSuccess(fetchDataTask));
            });
    };
};