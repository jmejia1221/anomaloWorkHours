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

export const createTask = (taskData, time) => {
    return dispatch => {
        dispatch(startTask());
        db.collection('tasks').doc(taskData.userId.toString()).collection('taskList').add(taskData)
            .then(() => {
                dispatch(fetchWeekTasks(taskData.userId, time.currentDate, time.currentDay));
            })
            .catch(err => {
                dispatch(createTaskError(err));
            });
    };
};

// ========= Delete task

export const deleteTaskSucces = (id, taskData) => {
    return {
        type: actionTypes.CREATE_TASK_SUCCESS,
        taskId: id,
        weekTasks: taskData
    };
};

export const deleteTaskError = (err) => {
    return {
        type: actionTypes.CREATE_TASK_FAIL,
        error: err
    };
};

export const deleteTask = (userId, taskId, time) => {
    return dispatch => {
        dispatch(startTask());
        db.collection('tasks').doc(userId.toString()).collection('taskList').doc(taskId.toString()).delete()
            .then((doc) => {
                console.log('Successfully deleted');
                dispatch(fetchWeekTasks(userId, time.currentDate, time.currentDay));
            })
            .catch(err => {
                console.log('error')
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

export const fetchTaskDetail = (userId, week, weekDay, teamId) => {
    return dispatch => {
        const weekComputed = week - weekDay;
        dispatch(fetchTaskDetailStart());
        db.collection('tasks')
            .doc(userId.toString())
            .collection('taskList')
            .where('week', '==', weekComputed)
            .where('weekDay', '==', weekDay).limit(50)
            .where('team', '==', teamId.toString())
            .get()
            .then(querySnapshot => {
                const fetchDataTask = [];
                querySnapshot.forEach(function(res) {
                    const addingId = {
                        ...res.data(),
                        taskId: res.id
                    }
                    fetchDataTask.push(addingId);
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
                    const addingId = {
                        ...res.data(),
                        taskId: res.id
                    }
                    fetchDataTask.push(addingId);
                });
                dispatch(fetchWeekTasksSuccess(fetchDataTask));
            });
    };
};

// Week Hours

export const createWeekHoursStart = () => {
    return {
        type: actionTypes.CREATE_WEEK_HOURS_START
    };
};

export const createWeekHoursSuccess = (id, weekHours) => {
    return {
        type: actionTypes.CREATE_WEEK_HOURS_SUCCESS,
        id,
        weekHours
    };
};

export const createWeekHours = (weekHoursData) => {
    return dispatch => {
        dispatch(createWeekHoursStart());
        db.collection('weekHours').doc(weekHoursData.userId.toString()).collection('hoursList').add(weekHoursData)
            .then(() => {
                if (weekHoursData.weekDay === new Date().getDay()) {
                    dispatch(createWeekHoursSuccess(weekHoursData.id, weekHoursData))
                }
            })
            .catch(err => {
                dispatch(createTaskError(err));
            });
    };
};

export const getWeekHoursSuccess = (weekHours) => {
    return {
        type: actionTypes.FETCH_WEEK_HOURS_SUCCESS,
        weekHours
    }
}

export const getWeekHours = (userId, week, weekDay) => {
    return dispatch => {
        const weekComputed = week - weekDay;
        let ref = db.collection('weekHours').doc(userId.toString()).collection('hoursList').orderBy('weekDay', 'asc').where('week', '==', weekComputed).get();
        ref.then(querySnapshot => {
            const getWeekHours = [];
            querySnapshot.forEach(function(res) {
                const addingId = {
                    hoursId: res.id,
                    ...res.data()
                }
                getWeekHours.push(addingId);
            });
            dispatch(getWeekHoursSuccess(getWeekHours));
        })
        .catch(err => {
            console.log(err)
            // dispatch(fetchTaskDetailFail(err));
        });
    };
};

export const updateWeekHours = (weekHoursData, hoursId) => {
    return dispatch => {
        const ref = db.collection('weekHours')
            .doc(weekHoursData.userId.toString())
            .collection('hoursList')
            .doc(hoursId.toString());
        
        ref.update(weekHoursData);
    }
}