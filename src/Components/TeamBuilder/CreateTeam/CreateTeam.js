import React from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import './CreateTeam.css';

const CreateTeam = () => {
    return (
        <div className="CreateTeamContent">
            <h1>Create a team</h1>
            <div>
                <div>
                    <Input placeholder="Team Name" />
                </div>
                <div className="CreateTeamUser">
                    <Input placeholder="Add User" />
                </div>
            </div>
            <div className="CreateTeamFooter">
                <Button type="primary">Create</Button>
            </div>
        </div>
    )
}

export default CreateTeam;