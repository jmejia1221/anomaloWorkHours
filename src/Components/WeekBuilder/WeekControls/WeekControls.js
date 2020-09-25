import React from 'react';
import WeekDay from './WeekDay/WeekDay';
import Button from '../../UI/Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './WeekControls.css';

const WeekControls = (props) => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div className="WeekControls">
            <strong className="WeekControlsTitle">Week</strong>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    return <WeekDay type="days" key={i}>{day}</WeekDay>
                })}
            </ul>
            <Button
                clicked={props.addTask}
                icon={faPlus}
                type="primary"
                class="WeekControlsAdd">
                Add task
            </Button>
        </div>
    );
};

export default WeekControls;