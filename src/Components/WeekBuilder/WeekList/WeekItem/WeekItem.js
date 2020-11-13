import React from 'react';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import './WeekItem.css'

const WeekItem = (props) => {
    let tasks = props.taskDetails;
    let mapTasks = null

    if (tasks !== undefined && tasks.length) {
        mapTasks = tasks.map(task => {
            return (
                <li key={task.id} className="WeekItem">
                    <span className="WeekDescription">{task.description}</span>
                    <span className="WeekTicket">
                        <span className="WeekItemTicket">
                            {task.ticket}
                        </span>
                    </span>
                    <span className="WeekStatus">
                        <Button type="status" status="approved">
                            {task.status}
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
            )
            
        })
    }

    return (
        <>
            {mapTasks}
        </>
    )
};


export default WeekItem;