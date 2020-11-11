import React from 'react';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

import './TeamBuilder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Team from './Team/Team';

const TeamBuilder = (props) => {
    let teamsMapping = props.teams.map(team => {
        return (
            <Team
                key={team.id}
                teamId={team.id}
                teamCreated={team} />
        );
    });
    return (
        <>
            <h1 className="TeamBuilderTitle">
                <FontAwesomeIcon
                    className="TeamBuilderIcon"
                    icon={faLayerGroup} />
                <span>Create a Team</span>
            </h1>
            <div className="TeamBuilderContent">
                <div
                    onClick={props.addNewTeam}
                    className="TeamBuilderCreate">
                    Create a team
                </div>
                { teamsMapping }
            </div>
        </>
    )
}

export default TeamBuilder;