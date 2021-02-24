import React from 'react';
import WeekDay from './WeekDay/WeekDay';
import Button from '../../UI/Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './WeekControls.css';

const WeekControls = (props) => {
    const weekDays = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
    return (
        <div className="WeekControls">
            <strong className="WeekControlsTitle">Day</strong>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    let hasDay = day === weekDays[props.selectedDay];
                    return (
                        <WeekDay
                            hasDay={hasDay ? 'active' : ''}
                            type="days"
                            key={i}>
                            <span onClick={() => props.weekDayHandler(day)}>
                                {day}
                            </span>
                        </WeekDay>
                    )
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