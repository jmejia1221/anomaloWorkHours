import React from 'react';
import { faEdit, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { SpellText } from '../../../Shared/Utility';

import './Team.css'

const Team = (props) => {
    let setUsers = [];
    let usersLeft = null;
    let sliceUsers = null;
    if (props.teamCreated.users) {
        sliceUsers = props.teamCreated.users.slice(0, 4);
        setUsers = sliceUsers.map(user => {
            return SpellText(user.name);
        });
    }

    if (props.teamCreated.users.length > 4) {
        usersLeft = <span>+{ props.teamCreated.users.length - 4}</span>;
    }

    return (
        <div className="TeamBuilderTeam">
            <div className="teamLinks">
                <span
                    onClick={() => props.openUpdateModal(props.teamId)}
                    className="editLink">
                    <FontAwesomeIcon
                        className="editIcon"
                        icon={faEdit} />
                    Edit
                </span>
                <span className="visitLink">
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
                    setUsers.map((user, i) => (
                        <span key={i}>{user}</span>
                    ))
                }
                { usersLeft }
            </div>
        </div>
    )
}

export default Team;