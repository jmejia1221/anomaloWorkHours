import React from 'react';
import WeekItem from './WeekItem/WeekItem';

import './WeekList.css';

const WeekList = (props) => {
    return (
        <>
            <header className="WeekHead">
                <strong className="WeekDescription">Description</strong>
                <strong className="WeekTicket"># Ticket</strong>
                <strong className="WeekStatus">Status</strong>
                { props.actions && (
                    <strong className="WeekCheck">Actions</strong>
                ) }
            </header>
            <ul className="ListContent">
                {(props.taskDetails && props.taskDetails.length) ?
                    props.taskDetails.map((task, i) => {
                    return (
                        <WeekItem
                            key={i}
                            openTaskModal={props.openTaskModal}
                            removeTaskHandler={props.removeTaskHandler}
                            taskDetails={task}
                            actions={props.actions} />
                    )
                }) : null}
            </ul>
        </>
    );
};

export default WeekList;