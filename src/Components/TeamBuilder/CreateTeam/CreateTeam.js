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

    componentDidUpdate(prevProps) {
        if (this.props.teamDetails !== prevProps.teamDetails) {
            this.props.teamDetails[0].users.forEach(u => {
                this.props.addTeamUserHandler(u);
            });
        }
    }

    toggleCheckHandler = (currentUser) => {
        return this.props.usersSelected.some((user, i) => {
            return this.props.usersSelected[i].email === currentUser.email
        });
    }

    render() {
        let usersContainer = null;
        let users = this.props.users.map(user => {
            return (
                <span
                    key={user.userId}
                    className="addUserSelected">
                    <input
                        id={user.email}
                        name={user.email}
                        defaultChecked={this.toggleCheckHandler(user)}
                        type="checkbox" />
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
                <h1>
                    {this.props.isUpdateTeam ? `Update ${this.props.defaultTeamName}` : 'Create a team'}
                </h1>
                <div>
                    <div>
                        <Input
                            value={this.props.defaultTeamName}
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
                    {
                        this.props.isUpdateTeam ? (
                            <Button
                                type="primary"
                                clicked={this.props.updateTeam}>
                                Update
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                clicked={this.props.createTeam}>
                                Create
                            </Button>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CreateTeam;