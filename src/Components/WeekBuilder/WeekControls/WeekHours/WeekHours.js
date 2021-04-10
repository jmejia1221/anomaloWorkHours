import React from 'react';

import WeekDay from '../WeekDay/WeekDay';

import './WeekHours.css';

const weekHours = (props) => {
    const weekDays = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];

    let newWeekDays = [];
    let total = null;
    if (props.weekHoursList.length) {
        newWeekDays = weekDays.map((_, i) => {
            return props.weekHoursList.filter(day => (day.weekDay === i))[0]
        });
        total = props.weekHoursList
            .map(day => parseInt(day.dayHours))
            .reduce((sum, hour) => sum + hour);
    }

    return (
        <div className="WeekHoursContent">
            <ul className="WeekControlsList">
                {newWeekDays.map((day, i) => {
                    return (
                        <WeekDay type="hours" key={i}>
                            {day ?
                                <span>
                                    { props.isEditable ? (
                                        <span
                                            onClick={() => props.toggleHoursEditModal(day)}
                                            className="hourAdded">
                                            {day.dayHours} |
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() => props.weekDayHourHandler(day)}
                                            className="hourAdded">
                                            {day.dayHours} |
                                        </span>
                                    )}
                                    <span>{weekDays[i]}</span>
                                </span> :
                                weekDays[i]
                            }
                        </WeekDay>)
                })}
            </ul>
            <div className="WeekTotalHours">
                <strong>Total: </strong>
                <span className="total">{totalHours}</span>
            </div>
        </div>
    );
};

export default WeekHours;