import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import './CreateTeam.css';

class CreateTeam extends Component  {
    componentDidMount() {
        this.props.showUsersHandler();
    }

    render() {
        let usersContainer = null;
        let users = this.props.users.map(user => {
            return (
                <span
                    className="addUserSelected"
                    key={user.userId}>
                    <input id={user.email} type="checkbox" />
                    <label
                        htmlFor={user.email}
                        onClick={() => this.props.addTeamUserHandler(user)}>
                        {user.email}
                        <span className="checkIcon">
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                    </label>
                </span>
            );
        });

        if (this.props.users) {
            usersContainer = (
                <div className="addUserContent">
                    {users}
                </div>
            );
        }

        return (
            <div className="CreateTeamContent">
                <h1>Create a team</h1>
                <div>
                    <div>
                        <Input
                            name="teamName"
                            onChange={this.props.inputChanged}
                            placeholder="Team Name" />
                    </div>
                    <div className="CreateTeamUser">
                        <h4 className="addUserTitle">Add users to the team</h4>
                        {usersContainer}
                    </div>
                </div>
                <div className="CreateTeamFooter">
                    <Button
                        type="primary"
                        clicked={this.props.createTeam}>Create</Button>
                </div>
            </div>
        )
    }
}

export default CreateTeam;