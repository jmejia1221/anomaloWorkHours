import React from 'react';

import WeekDay from '../WeekDay/WeekDay';

import './WeekHours.css';

const weekHours = () => {
    const weekDays = ['7', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    return <WeekDay type="hours" key={i}>{day}</WeekDay>
                })}
            </ul>
        </div>
    );
};

export default weekHours;