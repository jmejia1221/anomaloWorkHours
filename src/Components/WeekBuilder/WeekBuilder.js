import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Weekcontrols from './WeekControls/WeekControls';
import WeekList from './WeekList/WeekList';
import WeekHours from './WeekControls/WeekHours/WeekHours';
import HoursListed from './WeekControls/HoursListed/HoursListed';
import Button from '../UI/Button/Button';

import './WeekBuilder.css';

const WeekBuilder = (props) => {
    return (
        <Aux>
            <div className="WeekBuilderContent">
                <h1 className="WeekBuilderName">
                    { props.name }
                </h1>
                { props.weekControls && (
                    <Weekcontrols
                        selectedDay={props.selectedDay}
                        weekDayHandler={props.weekDayHandler}
                        taskDetails={props.taskDetails}
                        showTaskButton
                        addTask={props.addTask} />
                )}
                <WeekList
                    removeTaskHandler={props.removeTaskHandler}
                    taskDetails={props.taskDetails}
                    actions={props.actions} />

                { props.hoursListed && <HoursListed /> }

                <div className="WeekHoursControl">
                    <span className="controlHourTitle">Working Time</span>
                    <div className="controlHour">
                        <div className="controlHourInput">
                            <input placeholder="Add Time" />
                        </div>
                        <Button
                            clicked={props.createTask}
                            type="primary">
                            Add
                        </Button>
                    </div>
                </div>

                { props.weekHours && <WeekHours /> }

                <span className="stitchings">
                    <span className="stitching"></span>
                    <span className="stitching"></span>
                    <span className="stitching"></span>
                </span>
            </div>
        </Aux>
    )
}

export default WeekBuilder;