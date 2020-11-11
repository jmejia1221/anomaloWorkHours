import { faEdit, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Team.css'

const Team = (props) => {
    let setUsers = [];
    let usersLeft = null;
    if (props.teamCreated.users) {
        props.teamCreated.users.forEach(user => {
            let splitName = user.name.split(' ');
            let getLetter = splitName.map(name => {
                return name.substring(0, 1);
            });
            setUsers.push(getLetter.join(''));
        });
    }

    let sliceUsers = setUsers.slice(0, 4);

    if (setUsers.length > 4) {
        usersLeft = <span>+{ setUsers.length - 4}</span>;
    }

    return (
        <div className="TeamBuilderTeam">
            <div className="teamLinks">
                <span className="editLink">
                    <FontAwesomeIcon
                        className="editIcon"
                        icon={faEdit} />
                    Edit
                </span>
                <span
                    onClick={props.visitTeamDetail}
                    className="visitLink">
                    <NavLink to={`/teams/${props.teamId}`}>
                        <FontAwesomeIcon
                            className="linkIcon"
                            icon={faLink} />
                        Visit
                    </NavLink>
                </span>
            </div>
            <h3>{props.teamCreated.team}</h3>
            <div className="TeamBuilderUsers">
                {
                    sliceUsers.map((user, i) => (
                        <span key={i}>{user}</span>
                    ))
                }
                { usersLeft }
            </div>
        </div>
    )
}

export default Team;