import React from 'react';
import WeekDay from './WeekDay/WeekDay';

import './WeekControls.css';

const WeekControls = () => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div className="WeekControls">
            <strong className="WeekControlsTitle">Week</strong>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    return <WeekDay type="days" key={i}>{day}</WeekDay>
                })}
            </ul>
        </div>
    );
};

export default WeekControls;