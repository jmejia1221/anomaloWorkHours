import React from 'react';
import WeekDay from '../WeekDay/WeekDay';

import './WeekHours.css';

const weekHours = () => {
    const weekDays = ['7', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div>
            <div className="WeekHoursControl">
                <div className="controlHour">
                    <div className="controlHourInput">
                        <input placeholder="Add hours" />
                    </div>
                </div>
                <span className="WeekHoursDay">+</span>
            </div>
            <ul className="WeekControlsList">
                {weekDays.map((day, i) => {
                    return <WeekDay type="hours" key={i}>{day}</WeekDay>
                })}
            </ul>
        </div>
    );
};

export default weekHours;