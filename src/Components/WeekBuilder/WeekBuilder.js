import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Weekcontrols from './WeekControls/WeekControls';
import WeekList from './WeekList/WeekList';
import WeekHours from './WeekControls/WeekHours/WeekHours';
import HoursListed from './WeekControls/HoursListed/HoursListed';

import './WeekBuilder.css';

const WeekBuilder = (props) => (
    <Aux>
        <div className="WeekBuilderContent">
            <h1 className="WeekBuilderName">
                { props.name }
            </h1>
            { props.weekControls && (
                <Weekcontrols addTask={props.addTask} />
            )}
            <WeekList actions={props.actions} />
            { props.hoursListed && <HoursListed /> }
            { props.weekHours && <WeekHours /> }
            <span className="stitchings">
                <span className="stitching"></span>
                <span className="stitching"></span>
                <span className="stitching"></span>
            </span>
        </div>
    </Aux>
);

export default WeekBuilder;