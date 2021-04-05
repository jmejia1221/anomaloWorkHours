import React from 'react';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import './WeekItem.css'

const WeekItem = (props) => {
    let task = props.taskDetails;
    let mapTasks = null
    if (task) {
        mapTasks = (
            <li key={task.taskId} className="WeekItem">
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
                            <FontAwesomeIcon
                                onClick={() => props.openTaskModal(task)}
                                className='iconAction'
                                icon={faEdit} />
                            <FontAwesomeIcon
                                onClick={() => props.removeTaskHandler(task.taskId)}
                                className='iconAction'
                                icon={faTrash} />
                        </span>
                    </span>
                ) }
            </li>
        )
    }

    return (
        <>
            {mapTasks}
        </>
    )
};


export default WeekItem;