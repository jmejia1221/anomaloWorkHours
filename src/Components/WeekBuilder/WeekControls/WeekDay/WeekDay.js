import React from 'react';

import './WeekDay.css';

const weekDay = (props) => {
    let typeClass = '';
    let activeClass = props.hasDay ? ' ' + props.hasDay : '';
    (props.type === 'hours') ?
        typeClass = 'WeekDayHours' :
        typeClass = 'weekDay'
    return (
    <li className={typeClass + activeClass}>
            {props.children}
    </li>);
}

export default weekDay;