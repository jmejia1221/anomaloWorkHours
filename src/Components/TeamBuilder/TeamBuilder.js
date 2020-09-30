import React from 'react';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../UI/Button/Button';

import './TeamBuilder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Team from './Team/Team';

const TeamBuilder = (props) => {
    let teams = [
        {
            id: 1,
            name: 'Anomalos',
            users: [
                {
                    id: 1,
                    name: 'John Mejia',
                },
                {
                    id: 2,
                    name: 'Juan Hernandez',
                },
                {
                    id: 3,
                    name: 'Sergio Pulgarin',
                },
                {
                    id: 4,
                    name: 'Sebastian Clavijo',
                },
                {
                    id: 5,
                    name: 'Daniel Mejia',
                },
                {
                    id: 6,
                    name: 'Angie Duque',
                }
            ]
        },
        {
            id: 2,
            name: 'Anomalos Remix',
            users: [
                {
                    id: 1,
                    name: 'John Mejia',
                },
                {
                    id: 2,
                    name: 'Juan Hernandez',
                },
                {
                    id: 3,
                    name: 'Sergio Pulgarin',
                },
                {
                    id: 4,
                    name: 'Sebastian Clavijo',
                },
                {
                    id: 5,
                    name: 'Daniel Mejia',
                }
            ]
        }
    ];
    let teamsMapping = teams.map(team => {
        return <Team key={team.id} teamCreated={team} />
    })
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