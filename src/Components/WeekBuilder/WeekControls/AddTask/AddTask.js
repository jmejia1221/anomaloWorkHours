import React from 'react';

import Weekcontrols from '../WeekControls';
import Button from '../../../UI/Button/Button';

import './AddTask.css';

const AddTask = ({
    taskDaySelected = null,
    taskValue,
    isEditTask,
    createTask,
    editTask,
    weekDayHandler,
    taskHandler
}) => {
    let isButtonDisabled = taskDaySelected === null || !taskValue;
    let textAreaRender = (
        <span className="TaskExample">Select a day</span>
    );

    if (taskDaySelected) {
        textAreaRender = (
            <>
                <span className="TaskExample">E.g. Description task (OP-#Ticket) [status]</span>
                <div className="TaskDescription">
                    <textarea value={taskValue} onChange={taskHandler} />
                </div>
            </>
        )
    }
    return (
        <div>
            <h1 className="TaskTitle">Add task</h1>
            <Weekcontrols
                selectedDay={taskDaySelected}
                weekDayHandler={weekDayHandler}
                showTaskButton={false} />
            {textAreaRender}
            <div className="TaskFooter">
                { !isEditTask ? (
                    <Button
                        disabled={isButtonDisabled}
                        clicked={createTask}
                        type="primary">
                        Add
                    </Button>
                ) : (
                    <Button
                        disabled={isButtonDisabled}
                        clicked={editTask}
                        type="primary">
                        Update
                    </Button>
                )}
            </div>
        </div>
    )
};

export default AddTask;