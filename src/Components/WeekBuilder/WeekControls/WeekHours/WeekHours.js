import React from 'react';

import WeekDay from '../WeekDay/WeekDay';

import './WeekHours.css';

const weekHours = (props) => {
    const weekDays = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];

    let newWeekDays = [];
    if (props.weekHoursList.length) {
        newWeekDays = weekDays.map((_, i) => {
            return props.weekHoursList.filter(day => (day.weekDay === i))[0]
        });
    }

    return (
        <div>
            <ul className="WeekControlsList">
                {newWeekDays.map((day, i) => {
                    return <WeekDay type="hours" key={i}>
                        {day ? day.dayHours : weekDays[i]}
                    </WeekDay>
                })}
            </ul>
        </div>
    );
};

export default weekHours;