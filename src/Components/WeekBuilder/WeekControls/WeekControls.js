import React from 'react';
import WeekDay from './WeekDay/WeekDay';
import Button from '../../UI/Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './WeekControls.css';

const WeekControls = (props) => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div className="WeekControls">
            <strong className="WeekControlsTitle">Day</strong>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    return <WeekDay type="days" key={i}>{day}</WeekDay>
                })}
            </ul>
            {
                props.showTaskButton &&
                <Button
                    clicked={props.addTask}
                    icon={faPlus}
                    type="primary"
                    class="WeekControlsAdd">
                    Add Day's tasks
                </Button>
            }
        </div>
    );
};

export default WeekControls;