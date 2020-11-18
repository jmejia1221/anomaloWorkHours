import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    taskData: [],
    error: null,
    taskDataDetail: null,
    weekTasks: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.CREATE_TASK_SUCCESS:
            const newTask = {
                ...action.weekTasks,
                id: action.taskId
            };
            return {
                ...state,
                loading: false,
                weekTasks: state.weekTasks.concat(newTask)
            };
        case actionTypes.CREATE_TASK_FAIL:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.FETCH_TASK_DETAIL_START:
            return {
                ...state,
                taskDataDetail: null,
                loading: true
            };
        case actionTypes.FETCH_TASK_DETAIL_SUCCESS:
            const taskDetails =  {
                [action.taskUserId]: action.tasks
            };
            return {
                ...state,
                taskDataDetail: {
                    ...state.taskDataDetail,
                    ...taskDetails,
                },
                loading: false
            };
        case actionTypes.FETCH_WEEK_TASKS_START:
            return {
                ...state,
                weekTasks: [],
                loading: true
            };
        case actionTypes.FETCH_WEEK_TASKS_SUCCESS:
            return {
                ...state,
                weekTasks: action.weekTasks,
                loading: false
            };
    
        default:
            return state;
    }
};

export default reducer;