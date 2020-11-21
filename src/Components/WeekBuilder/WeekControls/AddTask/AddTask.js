import React from 'react';

import Weekcontrols from '../WeekControls';
import Button from '../../../UI/Button/Button';

import './AddTask.css';

const AddTask = (props) => {
    return (
        <div>
            <h1 className="TaskTitle">Add task</h1>
            <Weekcontrols
                selectedDay={props.taskDaySelected}
                weekDayHandler={props.weekDayHandler}
                showTaskButton={false} />
            <span className="TaskExample">E.g. Description task (OP-#Ticket) [status]</span>
            <div className="TaskDescription">
                <textarea onChange={props.taskHandler}></textarea>
            </div>
            <div className="TaskFooter">
                <Button
                    clicked={props.createTask}
                    type="primary">
                    Add
                </Button>
            </div>
        </div>
    )
};

export default AddTask;