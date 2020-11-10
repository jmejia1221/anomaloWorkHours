import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    taskData: [],
    error: null
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
                ...action.taskData,
                id: action.taskId
            };
            return {
                ...state,
                loading: false,
                taskData: state.taskData.concat(newTask)
            };
        case actionTypes.CREATE_TASK_FAIL:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.FETCH_TASK_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_TASK_SUCCESS:
            return {
                ...state,
                taskData: action.tasks,
                loading: false
            };
        case actionTypes.FETCH_TASK_FAIL:
            return {
                ...state,
                error: action.error
            };
    
        default:
            return state;
    }
};

export default reducer;