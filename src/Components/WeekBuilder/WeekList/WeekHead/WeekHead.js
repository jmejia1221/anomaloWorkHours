import React from 'react';

import './WeekHead.css';

const weekHead = (props) => (
    <header className="WeekHead">
        <strong className="WeekDescription">Description</strong>
        <strong className="WeekTicket"># Ticket</strong>
        <strong className="WeekStatus">Status</strong>
        { props.actions && (
            <strong className="WeekCheck">Actions</strong>
        ) }
    </header>
);

export default weekHead;