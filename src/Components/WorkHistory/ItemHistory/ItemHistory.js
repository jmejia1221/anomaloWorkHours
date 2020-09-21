import React from 'react';

import './ItemHistory.css';

const listHistory = (props) => (
    <li className="ItemContainer">
        <a
            href={props.link}
            className={props.active ? 'active' : ''}>
            <div className="ItemBox">
                <span className="hours">
                    <strong className="hoursNumber">
                        {props.hours}
                    </strong>
                    <span className="hoursText">Hours</span>
                </span>
                <span className="date">
                    <span className="dateStart">{props.dateStart}</span>
                    <span className="dateEnd">{props.dateEnd}</span>
                </span>
            </div>
        </a>
    </li>
);

export default listHistory;