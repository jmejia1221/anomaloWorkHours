import React from 'react';

// External libs
import {faVoteYea} from "@fortawesome/free-solid-svg-icons";

// Components
import Weekcontrols from '../WeekControls';
import Button from '../../../UI/Button/Button';
import NoItemSelected from "../../../NoItemSelected/NoItemSelected";

// CSS
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
        <NoItemSelected
            style={{
                maxWidth: '10rem',
                margin: '1rem auto',
                transform: 'none'
            }}
            icon={faVoteYea}
            text="Select a day to add a task" />
    );

    if (taskDaySelected || taskDaySelected === 0) {
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