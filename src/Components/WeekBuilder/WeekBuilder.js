import React from 'react';
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Weekcontrols from './WeekControls/WeekControls';
import WeekList from './WeekList/WeekList';
import WeekHours from './WeekControls/WeekHours/WeekHours';
import Button from '../UI/Button/Button';

import './WeekBuilder.css';

const WeekBuilder = (props) => {
    let selectedDayExist = null; 
    if (props.weekHoursList) {
        selectedDayExist = props.weekHoursList.some(week => (week.weekDay === props.selectedDay));
    }
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
                    userId={props.updateUserId}
                    removeTaskHandler={props.removeTaskHandler}
                    taskDetails={props.taskDetails}
                    actions={props.actions} />

                { props.weekControls && !selectedDayExist && (
                    <div className="WeekHoursControl">
                        <span className="controlHourTitle">Working Time</span>
                        <div className="controlHour">
                            <div className="controlHourInput">
                                <input
                                    onChange={props.dayHoursHandler}
                                    defaultValue={props.dayHours}
                                    type="number"
                                    placeholder="Add Time" />
                            </div>
                            <Button
                                clicked={props.addDayHourHandler}
                                type="primary">
                                Add
                            </Button>
                        </div>
                    </div>
                )}

                { (props.weekHours || props.hoursListed) && 
                    <WeekHours
                        weekDayHourHandler={props.weekDayHourHandler}
                        isEditable={props.hoursListEditable}
                        toggleHoursEditModal={props.toggleHoursEditModal}
                        weekHoursList={props.weekHoursList} /> 
                }

                <span className="stitchings">
                    <span className="stitching"></span>
                    <span className="stitching"></span>
                    <span className="stitching"></span>
                </span>
            </div>
        </Aux>
    )
}

export default withRouter(WeekBuilder);