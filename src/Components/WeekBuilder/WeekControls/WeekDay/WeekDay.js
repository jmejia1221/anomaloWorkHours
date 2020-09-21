import React from 'react';

import './WeekDay.css';

const weekDay = (props) => {
    let typeClass = '';
    (props.type === 'hours') ?
        typeClass = 'WeekDayHours' :
        typeClass = 'weekDay'
    return <li className={typeClass}>{props.children}</li>;
}

export default weekDay;