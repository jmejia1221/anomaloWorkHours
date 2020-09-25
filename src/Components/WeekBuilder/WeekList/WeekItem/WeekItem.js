import React from 'react';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                <span className="WeekItemAction">
                    <FontAwesomeIcon className='iconAction' icon={faEdit} />
                    <FontAwesomeIcon className='iconAction' icon={faTrash} />
                </span>
            </span>
        ) }
    </li>
);

export default WeekItem;