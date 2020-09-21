import React from 'react';

import WeekDay from '../WeekDay/WeekDay';

const HoursListed = () => {
    const weekDays = ['7', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <ul className="WeekControlsList">
            {weekDays.map((day, i) => {
                return <WeekDay type="hours" key={i}>{day}</WeekDay>
            })}
        </ul>
    );
};

export default HoursListed;