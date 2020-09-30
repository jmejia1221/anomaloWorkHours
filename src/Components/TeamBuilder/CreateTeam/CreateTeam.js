import React from 'react';

import Button from '../../UI/Button/Button';

import './CreateTeam.css';

const CreateTeam = () => {
    return (
        <div className="CreateTeamContent">
            <h1>Create a team</h1>
            <div>
                <div>
                    <input placeholder="Team Name" />
                </div>
                <div>
                    <input placeholder="Add user" />
                </div>
            </div>
            <div className="CreateTeamFooter">
                <Button type="primary">Create</Button>
            </div>
        </div>
    )
}

export default CreateTeam;