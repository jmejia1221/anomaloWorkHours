import React from 'react';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import './WeekItem.css'

const WeekItem = (props) => (
    <li className="WeekItem">
        <span className="WeekDescription">Description</span>
        <span className="WeekTicket">
            <span className="WeekItemTicket">
                OP-20110
            </span>
        </span>
        <span className="WeekStatus">
            <Button type="status" status="approved">
                Approved
            </Button>
        </span>
        { props.actions && (
            <span className="WeekCheck">
                <span className="WeekItemCheck">
                    <FontAwesomeIcon icon={faCog} />
                </span>
            </span>
        ) }
    </li>
);

export default WeekItem;