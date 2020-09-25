import React from 'react';

import Button from '../../../UI/Button/Button';

import './AddTask.css';

const AddTask = () => {
    return (
        <div>
            <h1 className="TaskTitle">Add task</h1>
            <span className="TaskExample">E.g. Description task (OP-#Ticket) [status]</span>
            <div className="TaskDescription">
                <textarea></textarea>
            </div>
            <div className="TaskFooter">
                <Button type="primary">Add</Button>
            </div>
        </div>
    )
}

export default AddTask;