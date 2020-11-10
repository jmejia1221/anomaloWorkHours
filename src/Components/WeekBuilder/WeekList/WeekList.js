import React from 'react';
import WeekItem from './WeekItem/WeekItem';
import Aux from '../../../hoc/Aux/Aux';

import './WeekList.css';

const WeekList = (props) => (
    <Aux>
        <header className="WeekHead">
            <strong className="WeekDescription">Description</strong>
            <strong className="WeekTicket"># Ticket</strong>
            <strong className="WeekStatus">Status</strong>
            { props.actions && (
                <strong className="WeekCheck">Actions</strong>
            ) }
        </header>
        <ul className="ListContent">
            <WeekItem actions={props.actions} />
        </ul>
    </Aux>
);

export default WeekList;